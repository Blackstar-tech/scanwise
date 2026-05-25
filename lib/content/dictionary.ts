export type DictionaryTerm = {
  slug: string;
  term: string;
  simpleDefinition: string;
  ctMeaning: string;
  ultrasoundMeaning: string;
  exampleSentence: string;
  relatedFindings: string[];
  relatedTermSlugs: string[];
  questions: string[];
};

export const dictionaryTerms: DictionaryTerm[] = [
  {
    slug: "hypoechoic",
    term: "Hypoechoic",
    simpleDefinition: "Darker than nearby tissue on ultrasound.",
    ctMeaning:
      "Hypoechoic is an ultrasound term, so it usually does not appear in CT reports. CT reports may use density words such as hypodense instead.",
    ultrasoundMeaning:
      "A hypoechoic area reflects fewer sound waves than surrounding tissue. It can describe fluid, inflammation, nodules, lymph nodes, or other findings.",
    exampleSentence: "There is a 1.1 cm hypoechoic nodule in the right thyroid lobe.",
    relatedFindings: ["Thyroid nodule", "Liver lesion", "Enlarged lymph node"],
    relatedTermSlugs: ["nodule", "lesion", "hypodense"],
    questions: [
      "What organ or tissue is hypoechoic?",
      "Does the report describe size, margins, or blood flow?",
      "Does it need follow-up or comparison with prior imaging?"
    ]
  },
  {
    slug: "hypodense",
    term: "Hypodense",
    simpleDefinition: "Darker or lower density than nearby tissue on CT.",
    ctMeaning:
      "Hypodense means an area is less dense than surrounding tissue on CT. It can describe cysts, fat, fluid, some lesions, or other tissue differences.",
    ultrasoundMeaning:
      "Hypodense is not an ultrasound term. Ultrasound reports usually use echo words such as hypoechoic, hyperechoic, or anechoic.",
    exampleSentence: "Small hypodense lesion in the liver, too small to characterize.",
    relatedFindings: ["Liver lesion", "Kidney cyst", "Fatty liver"],
    relatedTermSlugs: ["lesion", "cyst", "hypoechoic"],
    questions: [
      "Where is the hypodense area located?",
      "Was contrast used to characterize it?",
      "Was it present on older imaging?"
    ]
  },
  {
    slug: "lesion",
    term: "Lesion",
    simpleDefinition: "A broad imaging word for an area that looks different from surrounding tissue.",
    ctMeaning:
      "On CT, lesion can describe many appearances, including cysts, masses, inflammation, scars, fat changes, or tumors. The rest of the report gives the context.",
    ultrasoundMeaning:
      "On ultrasound, lesion may describe a visible focal area that differs in echogenicity, shape, texture, or blood flow.",
    exampleSentence: "Indeterminate 1.5 cm lesion in the right hepatic lobe.",
    relatedFindings: ["Liver lesion", "Thyroid nodule", "Kidney cyst"],
    relatedTermSlugs: ["mass", "cyst", "benign"],
    questions: [
      "What type of lesion does the radiologist suspect?",
      "Does it look benign, indeterminate, or concerning?",
      "What follow-up is recommended, if any?"
    ]
  },
  {
    slug: "benign",
    term: "Benign",
    simpleDefinition: "Not showing features of cancer in the context described.",
    ctMeaning:
      "A CT report may use benign appearing when imaging features look typical for a non-cancerous finding, such as a simple cyst or classic calcification pattern.",
    ultrasoundMeaning:
      "An ultrasound report may use benign appearing for features such as a simple cyst or a nodule pattern considered low risk.",
    exampleSentence: "Benign appearing simple cyst in the left kidney.",
    relatedFindings: ["Kidney cyst", "Thyroid nodule", "Incidental finding"],
    relatedTermSlugs: ["cyst", "nodule", "incidental-finding"],
    questions: [
      "What features make this look benign?",
      "Does it need any follow-up?",
      "Should this be compared with prior imaging?"
    ]
  },
  {
    slug: "incidental-finding",
    term: "Incidental Finding",
    simpleDefinition: "Something found on imaging that was not the main reason for the scan.",
    ctMeaning:
      "CT scans often show areas beyond the original clinical question, so small cysts, nodules, stones, or calcifications may be incidental.",
    ultrasoundMeaning:
      "Ultrasound can also find unexpected cysts, stones, nodules, or texture changes while looking for another issue.",
    exampleSentence: "Incidental 1.0 cm left adrenal nodule.",
    relatedFindings: ["Kidney cyst", "Gallstones", "Pulmonary nodule"],
    relatedTermSlugs: ["nodule", "cyst", "calcification"],
    questions: [
      "Was this related to my symptoms?",
      "Does it need follow-up?",
      "Is there an older scan to compare?"
    ]
  },
  {
    slug: "calcification",
    term: "Calcification",
    simpleDefinition: "Calcium-like material or density seen in tissue or structures.",
    ctMeaning:
      "On CT, calcification appears very bright and can be seen in stones, blood vessels, old inflammation, nodules, scars, or masses.",
    ultrasoundMeaning:
      "On ultrasound, calcification often appears bright and may create shadowing behind it.",
    exampleSentence: "Coarse calcification is present within the thyroid nodule.",
    relatedFindings: ["Kidney stone", "Thyroid nodule", "Gallstone"],
    relatedTermSlugs: ["nodule", "mass", "incidental-finding"],
    questions: [
      "Where is the calcification?",
      "Does the pattern affect the interpretation?",
      "Does it need follow-up imaging?"
    ]
  },
  {
    slug: "contrast",
    term: "Contrast",
    simpleDefinition: "A substance used in some imaging exams to make certain structures easier to see.",
    ctMeaning:
      "CT contrast is often iodine-based and may be given through an IV or by mouth. It can help show blood vessels, organs, inflammation, and some masses.",
    ultrasoundMeaning:
      "Most routine ultrasounds do not use contrast, though specialized contrast-enhanced ultrasound exists in some centers.",
    exampleSentence: "CT abdomen and pelvis performed with intravenous contrast.",
    relatedFindings: ["Liver lesion", "Mass", "Bowel inflammation"],
    relatedTermSlugs: ["lesion", "mass", "hypodense"],
    questions: [
      "Was contrast used in my scan?",
      "Did contrast help characterize the finding?",
      "Do I need kidney function testing before future contrast?"
    ]
  },
  {
    slug: "cyst",
    term: "Cyst",
    simpleDefinition: "A fluid-filled space or sac.",
    ctMeaning:
      "On CT, a simple cyst often looks fluid density and does not enhance after contrast. Complex cysts may need more detail or follow-up.",
    ultrasoundMeaning:
      "On ultrasound, a simple cyst is often anechoic, thin-walled, and has increased sound transmission behind it.",
    exampleSentence: "Simple cyst in the upper pole of the right kidney.",
    relatedFindings: ["Kidney cyst", "Liver cyst", "Thyroid cyst"],
    relatedTermSlugs: ["benign", "lesion", "hypodense"],
    questions: [
      "Is it described as simple or complex?",
      "How large is it?",
      "Does it need follow-up?"
    ]
  },
  {
    slug: "nodule",
    term: "Nodule",
    simpleDefinition: "A small rounded or focal area seen in tissue.",
    ctMeaning:
      "On CT, nodule can describe a small finding in the lung, thyroid, adrenal gland, skin, or other tissues. Location and size matter.",
    ultrasoundMeaning:
      "On ultrasound, nodules are often described by size, composition, echogenicity, margins, calcification, and blood flow.",
    exampleSentence: "A 9 mm solid hypoechoic thyroid nodule is present.",
    relatedFindings: ["Thyroid nodule", "Pulmonary nodule", "Enlarged lymph node"],
    relatedTermSlugs: ["hypoechoic", "calcification", "benign"],
    questions: [
      "How large is the nodule?",
      "What imaging features are described?",
      "Does it meet criteria for follow-up or biopsy?"
    ]
  },
  {
    slug: "mass",
    term: "Mass",
    simpleDefinition: "An area or lump large enough to be described as a distinct structure.",
    ctMeaning:
      "On CT, mass is a descriptive term. It can be benign, malignant, inflammatory, cystic, or indeterminate depending on features and context.",
    ultrasoundMeaning:
      "On ultrasound, a mass may be described as solid, cystic, mixed, vascular, hypoechoic, or heterogeneous.",
    exampleSentence: "No discrete mass identified in the visualized pancreas.",
    relatedFindings: ["Liver lesion", "Kidney mass", "Thyroid nodule"],
    relatedTermSlugs: ["lesion", "benign", "contrast"],
    questions: [
      "What organ is the mass in?",
      "Does the report suggest what it might represent?",
      "What follow-up test is recommended?"
    ]
  },
  {
    slug: "fatty-infiltration",
    term: "Fatty Infiltration",
    simpleDefinition: "More fat than expected within an organ or tissue.",
    ctMeaning:
      "On CT, fatty infiltration may make tissue look lower density. In the liver, it is often called hepatic steatosis.",
    ultrasoundMeaning:
      "On ultrasound, fatty infiltration of the liver often appears as increased echogenicity.",
    exampleSentence: "Diffuse fatty infiltration of the liver.",
    relatedFindings: ["Fatty liver", "Liver texture change", "Hepatic steatosis"],
    relatedTermSlugs: ["hypodense", "incidental-finding", "lesion"],
    questions: [
      "Which organ has fatty infiltration?",
      "Is it mild, moderate, or severe?",
      "Should labs or risk factors be reviewed?"
    ]
  },
  {
    slug: "enlarged-lymph-node",
    term: "Enlarged Lymph Node",
    simpleDefinition: "A lymph node that is larger than expected or has notable imaging features.",
    ctMeaning:
      "CT reports often describe lymph node size, location, and whether nodes are enlarged by common measurement thresholds.",
    ultrasoundMeaning:
      "Ultrasound may describe lymph node size, shape, fatty hilum, cortical thickness, and blood flow.",
    exampleSentence: "Mildly enlarged right cervical lymph node measuring 1.3 cm in short axis.",
    relatedFindings: ["Neck lymph node", "Abdominal lymph node", "Incidental finding"],
    relatedTermSlugs: ["mass", "hypoechoic", "incidental-finding"],
    questions: [
      "Where is the lymph node?",
      "Does it have normal or abnormal features?",
      "Should it be rechecked after symptoms improve?"
    ]
  }
];

export function getDictionaryTermBySlug(slug: string) {
  return dictionaryTerms.find((term) => term.slug === slug);
}

export function getRelatedTerms(term: DictionaryTerm, limit = 4) {
  return term.relatedTermSlugs
    .map((slug) => getDictionaryTermBySlug(slug))
    .filter(Boolean)
    .slice(0, limit) as DictionaryTerm[];
}

export function searchDictionaryTerms(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return dictionaryTerms;
  }

  return dictionaryTerms.filter((term) =>
    [
      term.term,
      term.simpleDefinition,
      term.ctMeaning,
      term.ultrasoundMeaning,
      term.exampleSentence,
      ...term.relatedFindings
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery)
  );
}
