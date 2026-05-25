"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import { createSupabaseBrowserClient, isSupabaseBrowserConfigured } from "@/lib/supabase/client";

const supabaseSetupMessage =
  "Supabase is not configured yet, so this local build will use demo login. Add Supabase keys to .env.local when you are ready for real email and Google auth.";
const emailCooldownSeconds = 60;
const rateLimitCooldownSeconds = 10 * 60;
const rateLimitMessage =
  "The email login limit has been reached. Please use Google sign-in for now, or wait before requesting another email link.";

export function AuthPanel({ nextPath = "/dashboard" }: { nextPath?: string }) {
  const isConfigured = isSupabaseBrowserConfigured();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(isConfigured ? null : supabaseSetupMessage);
  const [isLoading, setIsLoading] = useState(false);
  const [emailCooldownEndsAt, setEmailCooldownEndsAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const remainingCooldownSeconds = emailCooldownEndsAt
    ? Math.max(0, Math.ceil((emailCooldownEndsAt - now) / 1000))
    : 0;
  const isEmailOnCooldown = remainingCooldownSeconds > 0;

  useEffect(() => {
    if (!emailCooldownEndsAt) {
      return;
    }

    const interval = window.setInterval(() => {
      const nextNow = Date.now();
      setNow(nextNow);

      if (nextNow >= emailCooldownEndsAt) {
        setEmailCooldownEndsAt(null);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [emailCooldownEndsAt]);

  async function signInWithEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isEmailOnCooldown) {
      setMessage(`Please wait ${remainingCooldownSeconds} seconds before requesting another email link.`);
      return;
    }

    if (!isConfigured) {
      startDemoSession(email, nextPath);
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`
        }
      });

      if (error) {
        setMessage(getAuthErrorMessage(error.message));
        if (isRateLimitError(error.message)) {
          setEmailCooldownEndsAt(Date.now() + rateLimitCooldownSeconds * 1000);
        }
      } else {
        setMessage("Check your email for a secure sign-in link.");
        setEmailCooldownEndsAt(Date.now() + emailCooldownSeconds * 1000);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to start email login.");
    } finally {
      setIsLoading(false);
    }
  }

  async function signInWithGoogle() {
    if (!isConfigured) {
      startDemoSession("demo@scanwise.local", nextPath);
      return;
    }

    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`
        }
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to start Google login.");
    }
  }

  return (
    <div className="surface-card p-6 sm:p-7">
      <div className="mb-6">
        <div className="icon-tile mb-4 size-12">
          <ShieldCheck aria-hidden="true" size={22} />
        </div>
        <h1 className="text-2xl font-semibold heading-text">Secure login</h1>
        <p className="mt-2 text-sm leading-6 body-text">
          Use email or Google to access your private report dashboard.
        </p>
      </div>

      <form className="space-y-4" onSubmit={signInWithEmail}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium body-text">Email address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="focus-ring input-field"
            placeholder="you@example.com"
          />
        </label>
        <button
          type="submit"
          disabled={isLoading || isEmailOnCooldown}
          className="focus-ring primary-action w-full px-4 py-3"
        >
          <Mail aria-hidden="true" size={18} />
          {isLoading
            ? "Sending link"
            : isEmailOnCooldown
              ? `Try email again in ${remainingCooldownSeconds}s`
              : "Email login link"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-normal text-slate-400">
        <span className="h-px flex-1 bg-line dark:bg-white/10" />
        or
        <span className="h-px flex-1 bg-line dark:bg-white/10" />
      </div>

      <button
        type="button"
        onClick={signInWithGoogle}
        className="focus-ring secondary-action w-full px-4 py-3"
      >
        Continue with Google
      </button>

      {message ? (
        <p
          className={`mt-4 rounded-2xl p-4 text-sm leading-6 ${
            isConfigured
              ? "bg-slate-50 text-slate-700 dark:bg-white/5 dark:text-slate-300"
              : "bg-amber-50 text-amber-900 dark:bg-amber-400/10 dark:text-amber-100"
          }`}
        >
          {message}
          {!isConfigured ? (
            <>
              {" "}
              For real Supabase auth, follow `SUPABASE_SETUP.md`.
            </>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}

function startDemoSession(email: string, nextPath: string) {
  const safeEmail = email.trim() || "demo@scanwise.local";
  document.cookie = `scanwise_demo_email=${encodeURIComponent(safeEmail)}; path=/; max-age=604800; SameSite=Lax`;
  window.location.assign(nextPath);
}

function getAuthErrorMessage(message: string) {
  if (isRateLimitError(message)) {
    return rateLimitMessage;
  }

  return message;
}

function isRateLimitError(message: string) {
  return message.toLowerCase().includes("rate limit");
}
