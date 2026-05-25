export type Organ = {
  slug: string;
  name: string;
  shortDescription: string;
  overview: string;
  whatItDoes: string[];
  commonCtFindings: string[];
  commonUltrasoundFindings: string[];
  exampleReportWording: string[];
  relatedArticleSlugs: string[];
  relatedDictionarySlugs: string[];
  questions: string[];
};

export const organs: Organ[] = [
  {
    slug: "liver",
    name: "Liver",
    shortDescription: "A large upper abdominal organ often described in CT and ultrasound reports.",
    overview:
      "The liver sits in the right upper abdomen and is frequently evaluated for size, texture, fat content, masses, cysts, bile duct changes, and blood flow.",
    whatItDoes: [
      "Processes nutrients and medications",
      "Produces bile to help digest fats",
      "Helps regulate blood proteins and clotting factors",
      "Stores energy and supports metabolism"
    ],
    commonCtFindings: [
      "Fatty infiltration or hepatic steatosis",
      "Hypodense lesion or cyst",
      "Enhancing mass that may need further characterization",
      "Bile duct dilation",
      "Calcification or old granulomatous change"
    ],
    commonUltrasoundFindings: [
      "Increased echogenicity suggesting fatty liver",
      "Simple liver cyst",
      "Hyperechoic lesion such as a possible hemangioma",
      "Coarse liver texture",
      "Bile duct dilation"
    ],
    exampleReportWording: [
      "Diffuse increased echogenicity of the liver, compatible with hepatic steatosis.",
      "Small hypodense lesion in the right hepatic lobe, too small to characterize.",
      "No intrahepatic biliary ductal dilation."
    ],
    relatedArticleSlugs: ["fatty-liver", "liver-lesion", "ct-abdomen-guide"],
    relatedDictionarySlugs: ["fatty-infiltration", "hypodense", "lesion"],
    questions: [
      "Is this finding new compared with prior imaging?",
      "Does the report suggest follow-up imaging or blood tests?",
      "Which liver finding matters most for my symptoms?"
    ]
  },
  {
    slug: "kidney",
    name: "Kidney",
    shortDescription: "Kidney imaging often focuses on stones, cysts, blockage, masses, and size.",
    overview:
      "The kidneys filter blood and make urine. Imaging reports often describe both kidneys, the collecting system, stones, cysts, and surrounding tissue.",
    whatItDoes: [
      "Filters waste products from the blood",
      "Balances fluid and electrolytes",
      "Helps regulate blood pressure",
      "Produces urine through the collecting system and ureters"
    ],
    commonCtFindings: [
      "Kidney stone or ureteral stone",
      "Hydronephrosis from urinary blockage",
      "Simple or complex renal cyst",
      "Renal mass or lesion",
      "Scarring or cortical thinning"
    ],
    commonUltrasoundFindings: [
      "Simple renal cyst",
      "Hydronephrosis",
      "Echogenic focus with shadowing suggesting a stone",
      "Increased renal echogenicity",
      "Limited view due to bowel gas or body habitus"
    ],
    exampleReportWording: [
      "Simple cyst in the upper pole of the left kidney.",
      "Mild right hydronephrosis without visible obstructing stone on ultrasound.",
      "Nonobstructing 3 mm calculus in the lower pole of the right kidney."
    ],
    relatedArticleSlugs: ["kidney-cyst", "kidney-stones", "ct-abdomen-guide"],
    relatedDictionarySlugs: ["cyst", "calcification", "hypodense"],
    questions: [
      "Is there any sign of blockage?",
      "Is the cyst simple or complex?",
      "Does this finding need follow-up with urology or repeat imaging?"
    ]
  },
  {
    slug: "thyroid",
    name: "Thyroid",
    shortDescription: "The thyroid is commonly evaluated with ultrasound for nodules and gland texture.",
    overview:
      "The thyroid is a small gland in the front of the neck. Ultrasound reports describe thyroid size, texture, nodules, and nearby lymph nodes.",
    whatItDoes: [
      "Produces thyroid hormones",
      "Helps regulate metabolism",
      "Affects heart rate, temperature, and energy use",
      "Works with the brain's hormone signaling system"
    ],
    commonCtFindings: [
      "Incidental thyroid nodule",
      "Enlarged thyroid gland",
      "Calcified thyroid nodule",
      "Mass effect on nearby structures",
      "Enlarged neck lymph node"
    ],
    commonUltrasoundFindings: [
      "Solid or cystic thyroid nodule",
      "Hypoechoic nodule",
      "Microcalcifications or coarse calcifications",
      "Irregular margins",
      "Enlarged or abnormal appearing lymph node"
    ],
    exampleReportWording: [
      "Solid hypoechoic nodule in the right thyroid lobe measuring 1.2 cm.",
      "No suspicious cervical lymphadenopathy identified.",
      "Heterogeneous thyroid echotexture."
    ],
    relatedArticleSlugs: ["thyroid-ultrasound", "thyroid-nodule", "understanding-ultrasound-reports"],
    relatedDictionarySlugs: ["nodule", "hypoechoic", "calcification"],
    questions: [
      "Does this nodule meet criteria for biopsy?",
      "When should the nodule be rechecked?",
      "Should thyroid blood tests be reviewed with this result?"
    ]
  },
  {
    slug: "gallbladder",
    name: "Gallbladder",
    shortDescription: "Gallbladder reports often mention stones, sludge, wall thickening, and bile ducts.",
    overview:
      "The gallbladder stores bile under the liver. Ultrasound is commonly used to evaluate gallstones and signs of inflammation.",
    whatItDoes: [
      "Stores bile made by the liver",
      "Releases bile after meals",
      "Helps digest fats",
      "Connects to the bile duct system"
    ],
    commonCtFindings: [
      "Gallstones",
      "Gallbladder wall thickening",
      "Pericholecystic fluid",
      "Bile duct dilation",
      "Calcified gallbladder wall"
    ],
    commonUltrasoundFindings: [
      "Cholelithiasis",
      "Sludge",
      "Mobile echogenic stones with posterior shadowing",
      "Gallbladder wall thickening",
      "Sonographic Murphy sign"
    ],
    exampleReportWording: [
      "Cholelithiasis without sonographic evidence of acute cholecystitis.",
      "No biliary ductal dilation.",
      "Gallbladder wall measures 2 mm."
    ],
    relatedArticleSlugs: ["gallstones", "abdominal-ultrasound", "ct-abdomen-guide"],
    relatedDictionarySlugs: ["calcification", "incidental-finding", "mass"],
    questions: [
      "Is there any sign of gallbladder inflammation?",
      "Are the bile ducts enlarged?",
      "Do these findings explain my symptoms?"
    ]
  },
  {
    slug: "lungs",
    name: "Lungs",
    shortDescription: "Lung findings may appear on chest CT or as incidental lower chest findings on abdomen CT.",
    overview:
      "The lungs move oxygen into the blood and remove carbon dioxide. CT can show airways, lung tissue, nodules, scarring, fluid, and infection patterns.",
    whatItDoes: [
      "Moves oxygen into the bloodstream",
      "Removes carbon dioxide",
      "Supports breathing with the airways and chest wall",
      "Helps protect the body from inhaled particles"
    ],
    commonCtFindings: [
      "Pulmonary nodule",
      "Atelectasis or scarring",
      "Ground-glass opacity",
      "Consolidation",
      "Pleural effusion"
    ],
    commonUltrasoundFindings: [
      "Pleural effusion",
      "Limited evaluation because air blocks ultrasound",
      "Diaphragm motion assessment in selected exams",
      "Procedure guidance for fluid drainage",
      "Lung sliding in some emergency ultrasound exams"
    ],
    exampleReportWording: [
      "Mild bibasilar atelectatic change.",
      "Trace right pleural effusion.",
      "No focal airspace consolidation in the visualized lung bases."
    ],
    relatedArticleSlugs: ["what-is-a-ct-scan", "understanding-ct-reports", "calcification"],
    relatedDictionarySlugs: ["nodule", "mass", "incidental-finding"],
    questions: [
      "Was this lung finding the reason for the scan or incidental?",
      "Does it need follow-up chest imaging?",
      "How does it compare with any older chest scans?"
    ]
  },
  {
    slug: "abdomen",
    name: "Abdomen",
    shortDescription: "Abdominal imaging covers multiple organs, vessels, bowel, lymph nodes, and fluid.",
    overview:
      "Abdominal CT and ultrasound reports often move through organs one by one. They may also describe bowel, blood vessels, lymph nodes, fluid, and the abdominal wall.",
    whatItDoes: [
      "Contains digestive organs and urinary structures",
      "Moves food and fluid through the digestive tract",
      "Houses major blood vessels and lymph nodes",
      "Connects multiple organ systems in one region"
    ],
    commonCtFindings: [
      "Bowel wall thickening",
      "Enlarged lymph node",
      "Free fluid",
      "Kidney stone or gallstone",
      "Liver lesion or cyst"
    ],
    commonUltrasoundFindings: [
      "Fatty liver",
      "Gallstones",
      "Hydronephrosis",
      "Abdominal fluid",
      "Limited visualization due to bowel gas"
    ],
    exampleReportWording: [
      "No free intraperitoneal air or fluid.",
      "Mildly enlarged mesenteric lymph nodes are nonspecific.",
      "Evaluation of the pancreas is limited by overlying bowel gas."
    ],
    relatedArticleSlugs: ["ct-abdomen-guide", "abdominal-ultrasound", "understanding-ct-reports"],
    relatedDictionarySlugs: ["enlarged-lymph-node", "incidental-finding", "cyst"],
    questions: [
      "Which abdominal finding is most important?",
      "Is anything urgent or does it need follow-up?",
      "Was the exam limited in any important way?"
    ]
  }
];

export function getOrganBySlug(slug: string) {
  return organs.find((organ) => organ.slug === slug);
}
