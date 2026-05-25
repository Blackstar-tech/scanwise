export type ArticleCategory = "ct" | "ultrasound" | "findings";

export type ArticleSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  categoryLabel: string;
  summary: string;
  description: string;
  readingTime: string;
  lastReviewed: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  relatedSlugs: string[];
  terms: string[];
};

export const articleCategories: Array<{
  slug: ArticleCategory;
  title: string;
  description: string;
}> = [
  {
    slug: "ct",
    title: "Learn CT",
    description: "Understand CT scan basics, contrast, radiation, abdomen scans, and report structure."
  },
  {
    slug: "ultrasound",
    title: "Learn Ultrasound",
    description: "Plain English guides to ultrasound images, preparation, thyroid scans, and report wording."
  },
  {
    slug: "findings",
    title: "Learn Findings",
    description: "Common report findings explained with context, examples, and questions for your doctor."
  }
];

const categoryLabels: Record<ArticleCategory, string> = {
  ct: "CT",
  ultrasound: "Ultrasound",
  findings: "Finding"
};

function createArticle(params: Omit<Article, "categoryLabel" | "lastReviewed">): Article {
  return {
    ...params,
    categoryLabel: categoryLabels[params.category],
    lastReviewed: "May 2026"
  };
}

export const articles: Article[] = [
  createArticle({
    slug: "what-is-a-ct-scan",
    title: "What Is a CT Scan?",
    category: "ct",
    summary: "A patient-friendly explanation of how CT scans create cross-sectional images.",
    description:
      "CT scans use X-rays and computer processing to build detailed images of the inside of the body.",
    readingTime: "4 min read",
    keyTakeaways: [
      "CT scans are especially useful for viewing bones, organs, blood vessels, and urgent problems.",
      "A CT report describes what the radiologist sees, not a complete diagnosis by itself.",
      "Your doctor interprets CT findings alongside your symptoms, exam, and history."
    ],
    sections: [
      {
        heading: "How CT works",
        body: [
          "A CT scanner takes many X-ray images from different angles. A computer turns those images into slices, which help clinicians look through the body layer by layer.",
          "CT is often chosen when doctors need a fast, detailed view of the chest, abdomen, pelvis, head, bones, or blood vessels."
        ]
      },
      {
        heading: "What a CT report includes",
        body: [
          "Most CT reports include the body area scanned, whether contrast was used, important observations, and an impression section that summarizes the radiologist's main points."
        ],
        bullets: ["Technique", "Findings", "Impression", "Comparison with prior imaging when available"]
      },
      {
        heading: "What to ask your doctor",
        body: ["Bring the report to your appointment and ask how the findings fit your symptoms and next steps."],
        bullets: [
          "Which finding matters most for me?",
          "Does anything need follow-up imaging?",
          "Is this new compared with an older scan?"
        ]
      }
    ],
    relatedSlugs: ["understanding-ct-reports", "ct-with-contrast-explained", "ct-radiation-explained"],
    terms: ["contrast", "hypodense", "lesion"]
  }),
  createArticle({
    slug: "ct-with-contrast-explained",
    title: "CT With Contrast Explained",
    category: "ct",
    summary: "What contrast dye is, why it is used, and what enhancement means in reports.",
    description:
      "Contrast can make blood vessels, organs, inflammation, and some masses easier to evaluate on CT.",
    readingTime: "5 min read",
    keyTakeaways: [
      "Contrast helps certain tissues stand out more clearly.",
      "Some CT scans are done without contrast when contrast is not needed or not recommended.",
      "Tell your care team about kidney disease, allergies, pregnancy, and medications before contrast."
    ],
    sections: [
      {
        heading: "Why contrast is used",
        body: [
          "CT contrast is usually iodine-based. It travels through the bloodstream and can help radiologists see blood vessels, inflammation, tumors, infections, and organ injury more clearly."
        ]
      },
      {
        heading: "Common report wording",
        body: [
          "Reports may use words like enhancement, nonenhancing, arterial phase, venous phase, or delayed phase. These terms describe how tissue looks before and after contrast."
        ],
        bullets: ["Enhancing: tissue becomes brighter after contrast", "Nonenhancing: tissue does not visibly take up contrast", "Phase: timing of the scan after contrast injection"]
      },
      {
        heading: "Safety context",
        body: [
          "Most people tolerate CT contrast well, but the care team may check kidney function or choose a different imaging plan for some patients."
        ]
      }
    ],
    relatedSlugs: ["what-is-a-ct-scan", "understanding-ct-reports", "ct-abdomen-guide"],
    terms: ["contrast", "mass", "lesion"]
  }),
  createArticle({
    slug: "understanding-ct-reports",
    title: "Understanding CT Reports",
    category: "ct",
    summary: "A simple map of CT report sections and the language radiologists use.",
    description:
      "CT reports follow a pattern. Learning that structure can make the report less overwhelming.",
    readingTime: "6 min read",
    keyTakeaways: [
      "The impression section usually contains the highest priority summary.",
      "The findings section often has more detail and technical wording.",
      "Comparisons with previous scans can be important for understanding change over time."
    ],
    sections: [
      {
        heading: "Report structure",
        body: [
          "A CT report usually starts with the exam name and technique. The findings section describes what the radiologist sees. The impression section condenses the most important points."
        ],
        bullets: ["Exam", "Clinical history", "Technique", "Findings", "Impression"]
      },
      {
        heading: "Words that signal uncertainty",
        body: [
          "Radiology language often includes uncertainty. Phrases like likely, possible, may represent, or nonspecific mean the image has limits and must be interpreted clinically."
        ]
      },
      {
        heading: "Follow-up language",
        body: [
          "If the radiologist recommends follow-up, ask your doctor what time frame is appropriate and whether the follow-up is urgent, routine, or optional based on your situation."
        ]
      }
    ],
    relatedSlugs: ["what-is-a-ct-scan", "ct-with-contrast-explained", "ct-abdomen-guide"],
    terms: ["incidental-finding", "lesion", "hypodense"]
  }),
  createArticle({
    slug: "ct-radiation-explained",
    title: "CT Radiation Explained",
    category: "ct",
    summary: "A balanced explanation of CT radiation and why the scan may still be recommended.",
    description:
      "CT uses radiation, but doctors order it when the expected medical benefit outweighs the exposure.",
    readingTime: "4 min read",
    keyTakeaways: [
      "CT radiation dose varies by body part and scan protocol.",
      "The benefit of CT can be important in emergencies or complex symptoms.",
      "Ask whether prior imaging can be compared or whether another test is appropriate."
    ],
    sections: [
      {
        heading: "Why CT uses radiation",
        body: [
          "CT uses X-rays to create detailed slices of the body. The scanner and protocol are adjusted for the area being imaged and the clinical question."
        ]
      },
      {
        heading: "How to discuss risk",
        body: [
          "Radiation risk is not the same for every person or scan. Your doctor can explain why CT was recommended and whether alternatives such as ultrasound or MRI would answer the same question."
        ]
      },
      {
        heading: "Practical questions",
        body: ["Questions can help you understand the reason for the scan without delaying needed care."],
        bullets: [
          "What question is this CT trying to answer?",
          "Will this scan be compared with prior imaging?",
          "Is contrast needed for this specific scan?"
        ]
      }
    ],
    relatedSlugs: ["what-is-a-ct-scan", "ct-with-contrast-explained", "understanding-ct-reports"],
    terms: ["contrast", "incidental-finding", "calcification"]
  }),
  createArticle({
    slug: "ct-abdomen-guide",
    title: "CT Abdomen Guide",
    category: "ct",
    summary: "What CT abdomen scans commonly evaluate and how to read the report at a high level.",
    description:
      "CT abdomen scans can evaluate organs, bowel, blood vessels, lymph nodes, fluid, stones, and inflammation.",
    readingTime: "6 min read",
    keyTakeaways: [
      "Abdominal CT reports often move organ by organ.",
      "The impression section may group related findings into a short summary.",
      "Prior scans matter because size and appearance changes can guide next steps."
    ],
    sections: [
      {
        heading: "Organs commonly described",
        body: [
          "A CT abdomen report may mention the liver, gallbladder, pancreas, spleen, kidneys, adrenal glands, bowel, blood vessels, lymph nodes, and abdominal wall."
        ]
      },
      {
        heading: "Common findings",
        body: [
          "Common wording includes cyst, stone, fatty liver, enlarged lymph node, calcification, mass, lesion, thickening, and fluid. These terms need context from the full report."
        ],
        bullets: ["Kidney stone", "Gallstone", "Fatty liver", "Cyst", "Enlarged lymph node"]
      },
      {
        heading: "Bring context to the visit",
        body: [
          "Ask your doctor which finding explains your symptoms, which findings are incidental, and whether anything needs follow-up."
        ]
      }
    ],
    relatedSlugs: ["fatty-liver", "kidney-stones", "gallstones"],
    terms: ["cyst", "mass", "fatty-infiltration"]
  }),
  createArticle({
    slug: "how-ultrasound-works",
    title: "How Ultrasound Works",
    category: "ultrasound",
    summary: "A plain language guide to sound-wave imaging and why it is used.",
    description:
      "Ultrasound uses high-frequency sound waves to create live images of organs, fluid, blood flow, and soft tissue.",
    readingTime: "4 min read",
    keyTakeaways: [
      "Ultrasound does not use ionizing radiation.",
      "Image quality can depend on body area, bowel gas, motion, and the clinical question.",
      "Reports often describe echogenicity, cysts, nodules, stones, and blood flow."
    ],
    sections: [
      {
        heading: "The basic idea",
        body: [
          "An ultrasound probe sends sound waves into the body and receives echoes back. The machine turns those echoes into images."
        ]
      },
      {
        heading: "Why ultrasound is useful",
        body: [
          "Ultrasound can show movement in real time, evaluate fluid-filled structures, guide procedures, and assess blood flow with Doppler."
        ]
      },
      {
        heading: "Common limits",
        body: [
          "Ultrasound may be limited by bowel gas, depth, body habitus, or structures hidden behind bone or air. A limited exam does not always mean something is wrong."
        ]
      }
    ],
    relatedSlugs: ["understanding-ultrasound-reports", "abdominal-ultrasound", "thyroid-ultrasound"],
    terms: ["hypoechoic", "cyst", "nodule"]
  }),
  createArticle({
    slug: "abdominal-ultrasound",
    title: "Abdominal Ultrasound",
    category: "ultrasound",
    summary: "What an abdominal ultrasound can see and why fasting is often requested.",
    description:
      "Abdominal ultrasound commonly evaluates the liver, gallbladder, bile ducts, kidneys, spleen, pancreas, and vessels.",
    readingTime: "5 min read",
    keyTakeaways: [
      "Fasting can improve gallbladder and upper abdomen views.",
      "Ultrasound is commonly used for gallstones, liver texture, kidney blockage, and fluid.",
      "Some organs can be partly obscured by bowel gas."
    ],
    sections: [
      {
        heading: "What it evaluates",
        body: [
          "An abdominal ultrasound may look for gallstones, bile duct dilation, kidney swelling, liver texture changes, abdominal fluid, and some masses or cysts."
        ]
      },
      {
        heading: "Preparation",
        body: [
          "Many abdominal ultrasounds require fasting so the gallbladder is easier to see and bowel gas is reduced. Follow the instructions from your imaging center."
        ]
      },
      {
        heading: "Report wording",
        body: [
          "Reports may mention echogenic liver, shadowing stones, simple cysts, hydronephrosis, or limited visualization."
        ]
      }
    ],
    relatedSlugs: ["ultrasound-preparation", "gallstones", "fatty-liver"],
    terms: ["hypoechoic", "cyst", "gallstones"]
  }),
  createArticle({
    slug: "thyroid-ultrasound",
    title: "Thyroid Ultrasound",
    category: "ultrasound",
    summary: "How thyroid ultrasound reports describe nodules, size, and follow-up categories.",
    description:
      "Thyroid ultrasound evaluates the gland size, tissue texture, nodules, and nearby lymph nodes.",
    readingTime: "5 min read",
    keyTakeaways: [
      "Thyroid nodules are common and many are benign.",
      "Reports may describe size, composition, echogenicity, margins, shape, and calcifications.",
      "Follow-up depends on ultrasound features, size, history, and clinical judgment."
    ],
    sections: [
      {
        heading: "What the scan looks for",
        body: [
          "A thyroid ultrasound measures the thyroid and describes nodules in detail. It may also evaluate lymph nodes in the neck."
        ]
      },
      {
        heading: "Nodule descriptors",
        body: [
          "Words such as solid, cystic, hypoechoic, calcification, wider-than-tall, and irregular margin help radiologists estimate the need for follow-up."
        ]
      },
      {
        heading: "Questions for your clinician",
        body: ["Ask how the report category applies to your medical history and whether follow-up is recommended."],
        bullets: ["Does this nodule need follow-up ultrasound?", "Is biopsy recommended?", "How does this compare with prior imaging?"]
      }
    ],
    relatedSlugs: ["thyroid-nodule", "understanding-ultrasound-reports", "how-ultrasound-works"],
    terms: ["nodule", "hypoechoic", "calcification"]
  }),
  createArticle({
    slug: "ultrasound-preparation",
    title: "Ultrasound Preparation",
    category: "ultrasound",
    summary: "How to prepare for common ultrasound exams and why instructions differ.",
    description:
      "Preparation depends on the body part being scanned. Some exams require fasting or a full bladder.",
    readingTime: "4 min read",
    keyTakeaways: [
      "Preparation rules depend on the exam type.",
      "Fasting can help abdominal ultrasound views.",
      "A full bladder may be needed for pelvic or urinary tract ultrasound."
    ],
    sections: [
      {
        heading: "Why preparation matters",
        body: [
          "Ultrasound images can be affected by gas, bladder fullness, and organ position. Preparation helps the sonographer get clearer views."
        ]
      },
      {
        heading: "Common instructions",
        body: ["Always follow the instructions from your imaging center, because they know the exact exam ordered."],
        bullets: ["Fast before some abdominal exams", "Drink water before some pelvic exams", "Wear comfortable clothing"]
      },
      {
        heading: "When to call ahead",
        body: [
          "Call the imaging center if you have diabetes, are pregnant, have kidney disease, or cannot safely follow fasting or fluid instructions."
        ]
      }
    ],
    relatedSlugs: ["abdominal-ultrasound", "thyroid-ultrasound", "how-ultrasound-works"],
    terms: ["contrast", "cyst", "nodule"]
  }),
  createArticle({
    slug: "understanding-ultrasound-reports",
    title: "Understanding Ultrasound Reports",
    category: "ultrasound",
    summary: "A guide to ultrasound terms such as echogenicity, shadowing, and Doppler flow.",
    description:
      "Ultrasound reports describe how tissues reflect sound waves and whether blood flow is seen.",
    readingTime: "6 min read",
    keyTakeaways: [
      "Echogenicity describes how bright or dark something appears on ultrasound.",
      "Shadowing can occur behind stones or calcifications.",
      "Doppler evaluates movement of blood or fluid."
    ],
    sections: [
      {
        heading: "Core terms",
        body: [
          "Hypoechoic means darker than nearby tissue. Hyperechoic means brighter. Anechoic usually means no internal echoes, often used for simple fluid."
        ]
      },
      {
        heading: "Why measurements matter",
        body: [
          "Ultrasound reports often record dimensions of organs, cysts, nodules, stones, or ducts. Follow-up may focus on whether those measurements change."
        ]
      },
      {
        heading: "The impression",
        body: [
          "The impression section usually lists the radiologist's main summary and may recommend follow-up when needed."
        ]
      }
    ],
    relatedSlugs: ["how-ultrasound-works", "thyroid-ultrasound", "abdominal-ultrasound"],
    terms: ["hypoechoic", "nodule", "cyst"]
  }),
  createArticle({
    slug: "fatty-liver",
    title: "Fatty Liver",
    category: "findings",
    summary: "What fatty liver wording can mean on CT and ultrasound reports.",
    description:
      "Fatty liver means the liver has imaging features that suggest more fat than expected in liver tissue.",
    readingTime: "5 min read",
    keyTakeaways: [
      "Reports may use terms like hepatic steatosis, fatty infiltration, or increased echogenicity.",
      "Imaging cannot explain the cause by itself.",
      "Your doctor may review labs, medications, alcohol use, metabolic risk, and follow-up needs."
    ],
    sections: [
      {
        heading: "How it appears",
        body: [
          "On ultrasound, fatty liver may look brighter than expected. On CT, the liver may look lower density compared with nearby structures."
        ]
      },
      {
        heading: "Common wording",
        body: [
          "Example: Diffuse increased echogenicity of the liver, compatible with hepatic steatosis."
        ]
      },
      {
        heading: "Questions to ask",
        body: ["Your clinician can connect the imaging result to blood tests and risk factors."],
        bullets: ["Do I need liver blood tests?", "Is this mild, moderate, or severe?", "Should I have follow-up imaging?"]
      }
    ],
    relatedSlugs: ["ct-abdomen-guide", "abdominal-ultrasound", "liver-lesion"],
    terms: ["fatty-infiltration", "hypodense", "incidental-finding"]
  }),
  createArticle({
    slug: "kidney-cyst",
    title: "Kidney Cyst",
    category: "findings",
    summary: "What simple and complex kidney cyst wording can mean in reports.",
    description:
      "A kidney cyst is a fluid-filled space in or near the kidney, often found incidentally.",
    readingTime: "5 min read",
    keyTakeaways: [
      "Simple cysts are commonly described as benign appearing.",
      "Complex features may lead to follow-up or additional imaging.",
      "Size, internal echoes, septations, calcification, and enhancement can matter."
    ],
    sections: [
      {
        heading: "Simple cyst wording",
        body: [
          "A simple cyst may be described as thin-walled, fluid-filled, anechoic on ultrasound, or nonenhancing on CT."
        ]
      },
      {
        heading: "Complex cyst wording",
        body: [
          "Words like septation, thick wall, internal debris, calcification, or enhancement may require more context from your clinician."
        ]
      },
      {
        heading: "Questions to ask",
        body: ["Ask whether the cyst needs any follow-up and what features drive that decision."],
        bullets: ["Is this a simple cyst?", "Does it need repeat imaging?", "Is it related to my symptoms?"]
      }
    ],
    relatedSlugs: ["kidney-stones", "ct-abdomen-guide", "abdominal-ultrasound"],
    terms: ["cyst", "calcification", "hypodense"]
  }),
  createArticle({
    slug: "thyroid-nodule",
    title: "Thyroid Nodule",
    category: "findings",
    summary: "How thyroid nodules are described and why follow-up varies.",
    description:
      "A thyroid nodule is a lump or focal area within the thyroid gland, commonly seen on ultrasound.",
    readingTime: "5 min read",
    keyTakeaways: [
      "Many thyroid nodules are benign.",
      "Ultrasound features and size guide follow-up decisions.",
      "Your doctor may compare the report with thyroid labs and symptoms."
    ],
    sections: [
      {
        heading: "Report features",
        body: [
          "Reports may describe a nodule's size, location, solid or cystic composition, echogenicity, margins, calcifications, and shape."
        ]
      },
      {
        heading: "Follow-up",
        body: [
          "Some nodules are monitored with repeat ultrasound. Others may need biopsy depending on appearance, size, and clinical risk."
        ]
      },
      {
        heading: "Questions to ask",
        body: ["Your clinician can explain whether the nodule meets criteria for follow-up or biopsy."],
        bullets: ["What is the risk category?", "Do I need biopsy?", "When should this be rechecked?"]
      }
    ],
    relatedSlugs: ["thyroid-ultrasound", "understanding-ultrasound-reports", "calcification"],
    terms: ["nodule", "hypoechoic", "calcification"]
  }),
  createArticle({
    slug: "gallstones",
    title: "Gallstones",
    category: "findings",
    summary: "What gallstones are and why symptoms matter when reading the report.",
    description:
      "Gallstones are hardened deposits in the gallbladder and may or may not be causing symptoms.",
    readingTime: "4 min read",
    keyTakeaways: [
      "Ultrasound commonly detects gallstones.",
      "Shadowing and mobility are common report details.",
      "Symptoms and signs of inflammation affect next steps."
    ],
    sections: [
      {
        heading: "How reports describe them",
        body: [
          "Gallstones may be called cholelithiasis. Ultrasound may describe echogenic stones with posterior shadowing."
        ]
      },
      {
        heading: "Inflammation clues",
        body: [
          "Reports may mention gallbladder wall thickening, pericholecystic fluid, or a sonographic Murphy sign when inflammation is a concern."
        ]
      },
      {
        heading: "Questions to ask",
        body: ["Ask whether the stones explain your symptoms and whether any urgent features were seen."],
        bullets: ["Is there any sign of cholecystitis?", "Are the bile ducts enlarged?", "What symptoms should prompt urgent care?"]
      }
    ],
    relatedSlugs: ["abdominal-ultrasound", "ct-abdomen-guide", "calcification"],
    terms: ["calcification", "incidental-finding", "mass"]
  }),
  createArticle({
    slug: "liver-lesion",
    title: "Liver Lesion",
    category: "findings",
    summary: "What the word lesion means in liver imaging reports.",
    description:
      "A liver lesion is a visible area that looks different from surrounding liver tissue. It is a description, not a diagnosis by itself.",
    readingTime: "6 min read",
    keyTakeaways: [
      "Lesion is a broad imaging term.",
      "Size, contrast enhancement, cystic appearance, and comparison with prior scans matter.",
      "Your doctor may recommend comparison, follow-up, MRI, or no action depending on context."
    ],
    sections: [
      {
        heading: "Why the term is broad",
        body: [
          "A lesion can refer to many different appearances, including cysts, hemangiomas, focal fat changes, inflammation, infection, or tumors. The report context matters."
        ]
      },
      {
        heading: "Details that guide interpretation",
        body: [
          "Reports may describe whether the lesion is hypodense, hyperechoic, cystic, solid, enhancing, stable, or new compared with prior imaging."
        ]
      },
      {
        heading: "Questions to ask",
        body: ["Ask what type of lesion is suspected and what, if anything, should happen next."],
        bullets: ["Was this seen before?", "Does the report suggest a likely benign feature?", "Do I need follow-up imaging?"]
      }
    ],
    relatedSlugs: ["fatty-liver", "ct-with-contrast-explained", "ct-abdomen-guide"],
    terms: ["lesion", "hypodense", "benign"]
  }),
  createArticle({
    slug: "kidney-stones",
    title: "Kidney Stones",
    category: "findings",
    summary: "How CT and ultrasound reports describe stones and urinary blockage.",
    description:
      "Kidney stones are calcified deposits that may be seen in the kidney or urinary tract.",
    readingTime: "5 min read",
    keyTakeaways: [
      "CT can show stone size and location in detail.",
      "Ultrasound can detect some stones and signs of blockage.",
      "Hydronephrosis means swelling of the kidney collecting system and needs clinical context."
    ],
    sections: [
      {
        heading: "Stone details",
        body: [
          "Reports often mention stone size, side, location, and whether there is obstruction or swelling upstream from the stone."
        ]
      },
      {
        heading: "Common wording",
        body: [
          "Example: 4 mm calculus in the distal right ureter with mild upstream hydronephrosis."
        ]
      },
      {
        heading: "Questions to ask",
        body: ["Stone symptoms can change quickly, so ask your clinician what signs require urgent care."],
        bullets: ["Is there obstruction?", "How large is the stone?", "Do I need urology follow-up?"]
      }
    ],
    relatedSlugs: ["kidney-cyst", "ct-abdomen-guide", "abdominal-ultrasound"],
    terms: ["calcification", "cyst", "incidental-finding"]
  }),
  createArticle({
    slug: "calcification",
    title: "Calcification",
    category: "findings",
    summary: "What calcification means when it appears in CT or ultrasound reports.",
    description:
      "Calcification means calcium-like density or echoes are seen in tissue, vessels, stones, nodules, or old injury.",
    readingTime: "4 min read",
    keyTakeaways: [
      "Calcification is an imaging description, not a diagnosis by itself.",
      "Location and pattern matter.",
      "Calcifications may be old, benign, vascular, stone-related, or part of another finding."
    ],
    sections: [
      {
        heading: "How it appears",
        body: [
          "On CT, calcification is bright because calcium is dense. On ultrasound, calcification may appear bright and may cast a shadow."
        ]
      },
      {
        heading: "Why location matters",
        body: [
          "Calcification in a blood vessel, thyroid nodule, kidney stone, lymph node, or old injury can have very different meanings."
        ]
      },
      {
        heading: "Questions to ask",
        body: ["Ask your doctor whether the calcification is incidental or related to the main reason for the scan."],
        bullets: ["Where is the calcification?", "Does the pattern matter?", "Does it need follow-up?"]
      }
    ],
    relatedSlugs: ["thyroid-nodule", "kidney-stones", "gallstones"],
    terms: ["calcification", "nodule", "incidental-finding"]
  })
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory) {
  return articles.filter((article) => article.category === category);
}

export function getCategoryBySlug(slug: string) {
  return articleCategories.find((category) => category.slug === slug);
}

export function getFeaturedArticles() {
  return [
    getArticleBySlug("understanding-ct-reports"),
    getArticleBySlug("understanding-ultrasound-reports"),
    getArticleBySlug("liver-lesion")
  ].filter(Boolean) as Article[];
}

export function getRelatedArticles(article: Article, limit = 3) {
  return article.relatedSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter(Boolean)
    .slice(0, limit) as Article[];
}

export function searchArticles(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return articles;
  }

  return articles.filter((article) =>
    [
      article.title,
      article.summary,
      article.description,
      article.categoryLabel,
      ...article.keyTakeaways,
      ...article.terms
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery)
  );
}
