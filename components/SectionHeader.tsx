export function SectionHeader({
  eyebrow,
  title,
  body
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-normal eyebrow-text">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold heading-text sm:text-3xl">{title}</h2>
      {body ? <p className="mt-3 text-base leading-7 body-text">{body}</p> : null}
    </div>
  );
}
