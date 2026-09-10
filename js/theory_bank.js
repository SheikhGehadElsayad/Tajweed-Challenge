/**
 * Tajweed Challenge - Theoretical Question Bank
 * Prepared by Sheikh Gehad Elsayad
 * Total: 340 questions across 8 topics (T/F & MC)
 * 100% Pure English with transliterated Tajweed terminology
 */

const THEORETICAL_BANK = {
    "noon_sakinah_tanween": {
        "id": "noon_sakinah_tanween",
        "title": "Noon Saakinah & Tanween",
        "icon": "🌱",
        "description": "Rules of Izhar (Clarity), Idgham (Merging), Iqlab (Conversion), and Ikhfaa (Hiding)",
        "questions": [
            {
                "id": "noon_tf_1",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Noon Saakinah is a Noon free of vowels that remains constant in pronunciation and writing.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Noon Saakinah has a permanent Sukoon in both pronunciation and script."
            },
            {
                "id": "noon_tf_2",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Tanween is pronounced as a Noon Saakinah when continuing recitation, but drops when stopping at the end of the word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Tanween is an extra Noon sound in speech that disappears upon stopping."
            },
            {
                "id": "noon_tf_3",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "There are 5 primary rules for Noon Saakinah and Tanween.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "There are 4 primary rules: Izhar, Idgham, Iqlab, and Ikhfaa."
            },
            {
                "id": "noon_tf_4",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "The rules of Noon Saakinah apply to both nouns and verbs in the Holy Quran.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Noon Saakinah can appear in nouns, verbs, and particles."
            },
            {
                "id": "noon_tf_5",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Tanween can only appear at the end of nouns, never at the beginning or middle of words.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Tanween is a suffix attached exclusively to the end of nouns."
            },
            {
                "id": "noon_tf_6",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Izhar means 'Clarity' — pronouncing the Noon clearly from its origin without extra Ghunnah (nasalization).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Izhar manifests the letter cleanly from the throat without lengthening nasal sound."
            },
            {
                "id": "noon_tf_7",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "The letters of Izhar (Clarity) are 7 letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "There are 6 throat letters: Hamzah, Haa, 'Ayn, Haa, Ghayn, Khaa."
            },
            {
                "id": "noon_tf_8",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "The letters of Izhar (Clarity) all originate from the Throat area.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Hence it is named Izhar Halqi (Throat Clarity)."
            },
            {
                "id": "noon_tf_9",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Izhar (Clarity) can occur within a single word or between two separate words.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "For example: Yan'awna (one word), Man Aamana (two words)."
            },
            {
                "id": "noon_tf_10",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "The letter Qaaf is one of the letters of Izhar (Clarity).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Qaaf belongs to Ikhfaa (Hiding), not Izhar."
            },
            {
                "id": "noon_tf_11",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "In the printed Quran (Mushaf), Izhar on Noon Saakinah is indicated by a clear Sukoon (head of letter Khaa) placed above the Noon.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The head of Khaa sign signifies clear pronunciation (Izhar)."
            },
            {
                "id": "noon_tf_12",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Idgham means 'Merging' — inserting the Noon Saakinah into the following letter so they become one emphasized letter.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The first letter enters the second letter to form a single doubled letter."
            },
            {
                "id": "noon_tf_13",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "There are 6 letters for Idgham (Merging): Yaa, Raa, Meem, Laam, Waw, and Noon (Yarmaloon).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "All 6 letters are combined in the mnemonic Yarmaloon."
            },
            {
                "id": "noon_tf_14",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Idgham (Merging) can happen within one single word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Idgham only occurs between two separate words."
            },
            {
                "id": "noon_tf_15",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Idgham with Ghunnah (nasalization) occurs with the letters: Laam and Raa.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Laam and Raa are Idgham WITHOUT Ghunnah; with Ghunnah are: Yaa, Noon, Meem, Waw."
            },
            {
                "id": "noon_tf_16",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Idgham WITHOUT Ghunnah is considered a complete merger where both the letter and its nasal sound disappear.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The Noon completely merges into Laam or Raa without leaving any nasal trace."
            },
            {
                "id": "noon_tf_17",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "When Noon Saakinah is followed by Waw or Yaa within the same word (e.g., 'Dunya'), it must be read with Idgham.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "It must be pronounced clearly as Izhar Mutlaq (Absolute Clarity)."
            },
            {
                "id": "noon_tf_18",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "There are only 4 specific words in the entire Quran that have the rule of 'Izhar Mutlaq': Dunya, Bunyaan, Qinwaan, and Sinwaan.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "These four words preserve the Noon clearly to prevent distortion of meaning."
            },
            {
                "id": "noon_tf_19",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "In Idgham without Ghunnah, a Shaddah is placed on the following letter (Laam or Raa) in the Mushaf.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The Shaddah denotes a complete merging (Idgham Kaamil)."
            },
            {
                "id": "noon_tf_20",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Iqlab means 'Conversion' — changing the sound of Noon Saakinah or Tanween into a hidden Meem with Ghunnah.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The Noon turns completely into a Meem sound accompanied by Ghunnah."
            },
            {
                "id": "noon_tf_21",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Iqlab (Conversion) has two letters: Baa and Meem.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Iqlab has only ONE letter, which is Baa."
            },
            {
                "id": "noon_tf_22",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Iqlab (Conversion) can occur within a single word or between two separate words.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Examples: Anbi'hum (one word), Min Ba'd (two words)."
            },
            {
                "id": "noon_tf_23",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "In the printed Quran, a tiny letter Meem is placed above the Noon or Tanween to indicate Iqlab.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The small vertical Meem is the universal Quranic sign for Iqlab."
            },
            {
                "id": "noon_tf_24",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "During Iqlab, the lips should be pressed together extremely tightly without any nasal sound.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "The lips close gently with an audible Ghunnah held for 2 counts."
            },
            {
                "id": "noon_tf_25",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Ikhfaa means 'Hiding' — pronouncing the Noon sound between Izhar (Clarity) and Idgham (Merging) while retaining the Ghunnah.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Ikhfaa is an intermediate state between clear Izhar and blended Idgham."
            },
            {
                "id": "noon_tf_26",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "The number of Ikhfaa (Hiding) letters is 15 letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The remaining 15 letters of the alphabet belong to Ikhfaa Haqeeqi."
            },
            {
                "id": "noon_tf_27",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "Ikhfaa (Hiding) only occurs between two separate words, never in a single word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Ikhfaa occurs both in a single word (Anzalna) and between two words (Min Qabl)."
            },
            {
                "id": "noon_tf_28",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "The Ghunnah (nasal sound) during Ikhfaa is held for approximately 2 counts (Harakataan).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The standard duration for Ghunnah in Ikhfaa is 2 counts."
            },
            {
                "id": "noon_tf_29",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "If the letter following the Noon Saakinah is heavy (such as: Saad, Dhad, Taa, Zhaa, Qaaf), the Ghunnah of Ikhfaa must also be heavy (Mufakhkhamah).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The Ghunnah reflects the heaviness of the following letter."
            },
            {
                "id": "noon_tf_30",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "tf",
                "prompt": "The Ghunnah of Ikhfaa is pronounced heavy when followed by the letter Kaaf.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Kaaf is a light letter (Muraqqaq), so the Ghunnah must be light."
            },
            {
                "id": "noon_mc_1",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "How many rules are there for Noon Saakinah and Tanween?",
                "choicesList": [
                    "3",
                    "4",
                    "5",
                    "6"
                ],
                "ans": "4",
                "explanation": "The 4 rules are: Izhar, Idgham, Iqlab, and Ikhfaa."
            },
            {
                "id": "noon_mc_2",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "Which Tajweed rule means 'Clarity' — pronouncing the Noon clearly without extra nasalization?",
                "choicesList": [
                    "Idgham",
                    "Izhar",
                    "Iqlab",
                    "Ikhfaa"
                ],
                "ans": "Izhar",
                "explanation": "Izhar means clarity and distinct manifestation of the letter."
            },
            {
                "id": "noon_mc_3",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "From which vocal area do all the letters of Izhar Halqi (Throat Clarity) originate?",
                "choicesList": [
                    "The Tongue",
                    "The Throat",
                    "The Lips",
                    "The Nasal Cavity"
                ],
                "ans": "The Throat",
                "explanation": "All 6 Izhar letters are produced in the throat (Al-Halq)."
            },
            {
                "id": "noon_mc_4",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "Which of the following is NOT a letter of Izhar (Clarity)?",
                "choicesList": [
                    "Haa",
                    "Ghayn",
                    "Qaaf",
                    "Hamzah"
                ],
                "ans": "Qaaf",
                "explanation": "Qaaf originates from the base of the tongue and belongs to Ikhfaa."
            },
            {
                "id": "noon_mc_5",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "How many letters belong to Izhar (Clarity)?",
                "choicesList": [
                    "4",
                    "5",
                    "6",
                    "8"
                ],
                "ans": "6",
                "explanation": "The 6 letters are: Hamzah, Haa, Ayn, Haa, Ghayn, Khaa."
            },
            {
                "id": "noon_mc_6",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "Which rule means 'Merging' — blending the Noon Saakinah into the following letter?",
                "choicesList": [
                    "Izhar",
                    "Idgham",
                    "Iqlab",
                    "Ikhfaa"
                ],
                "ans": "Idgham",
                "explanation": "Idgham blends the Noon into the next letter."
            },
            {
                "id": "noon_mc_7",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "How many letters belong to Idgham (Merging)?",
                "choicesList": [
                    "4",
                    "6",
                    "8",
                    "15"
                ],
                "ans": "6",
                "explanation": "The 6 letters are: Yaa, Raa, Meem, Laam, Waw, Noon."
            },
            {
                "id": "noon_mc_8",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "Which two letters represent Idgham WITHOUT Ghunnah (Complete Merging without nasal sound)?",
                "choicesList": [
                    "Laam and Raa",
                    "Meem and Noon",
                    "Waw and Yaa",
                    "Baa and Taa"
                ],
                "ans": "Laam and Raa",
                "explanation": "Laam and Raa completely absorb the Noon with no remaining nasal resonance."
            },
            {
                "id": "noon_mc_9",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "What Tajweed rule applies when Noon Saakinah is followed by Waw or Yaa inside the SAME word (e.g., 'Dunya' or 'Bunyaan')?",
                "choicesList": [
                    "Idgham with Ghunnah",
                    "Ikhfaa (Hiding)",
                    "Izhar Mutlaq (Absolute Clarity)",
                    "Iqlab (Conversion)"
                ],
                "ans": "Izhar Mutlaq (Absolute Clarity)",
                "explanation": "Meeting in a single word prevents Idgham and requires Izhar Mutlaq."
            },
            {
                "id": "noon_mc_10",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "How many words in the Holy Quran contain the rule of 'Izhar Mutlaq' (Absolute Clarity) where Noon meets Waw or Yaa inside one word?",
                "choicesList": [
                    "2 words",
                    "4 words (Dunya, Bunyaan, Qinwaan, Sinwaan)",
                    "6 words",
                    "8 words"
                ],
                "ans": "4 words (Dunya, Bunyaan, Qinwaan, Sinwaan)",
                "explanation": "These are the only 4 occurrences in the entire Quran."
            },
            {
                "id": "noon_mc_11",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "What is the ONLY letter of Iqlab (Conversion)?",
                "choicesList": [
                    "Meem",
                    "Baa",
                    "Waw",
                    "Faa"
                ],
                "ans": "Baa",
                "explanation": "Baa is the sole letter that triggers Iqlab."
            },
            {
                "id": "noon_mc_12",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "Into which sound is the Noon Saakinah converted during Iqlab?",
                "choicesList": [
                    "clear Noon",
                    "hidden Meem with Ghunnah",
                    "Waw",
                    "silent letter"
                ],
                "ans": "hidden Meem with Ghunnah",
                "explanation": "The Noon becomes a pure Meem with nasal resonance."
            },
            {
                "id": "noon_mc_13",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "How many letters belong to Ikhfaa (Hiding)?",
                "choicesList": [
                    "6",
                    "10",
                    "14",
                    "15"
                ],
                "ans": "15",
                "explanation": "Ikhfaa has 15 letters."
            },
            {
                "id": "noon_mc_14",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "If Noon Saakinah or Tanween is followed by the heavy letter Taa or Qaaf, the Ghunnah of Ikhfaa must be:",
                "choicesList": [
                    "Light (Muraqqaq)",
                    "Heavy (Mufakhkham)",
                    "Completely silent",
                    "Cancelled"
                ],
                "ans": "Heavy (Mufakhkham)",
                "explanation": "Heavy letters produce a full, heavy Ghunnah."
            },
            {
                "id": "noon_mc_15",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "If Noon Saakinah is followed by the light letter Seen or Taa, how should the Ghunnah be pronounced?",
                "choicesList": [
                    "Heavy (Mufakhkham)",
                    "Light (Muraqqaq)",
                    "Extended to 6 counts",
                    "Without nasal resonance"
                ],
                "ans": "Light (Muraqqaq)",
                "explanation": "Light letters produce a delicate, light Ghunnah."
            },
            {
                "id": "noon_mc_16",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "What is the linguistic meaning of 'Izhar'?",
                "choicesList": [
                    "Merging",
                    "Clarity / Manifestation",
                    "Hiding",
                    "Changing"
                ],
                "ans": "Clarity / Manifestation",
                "explanation": "Izhar literally means making something clear and evident."
            },
            {
                "id": "noon_mc_17",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "In the Mushaf, how does the Sukoon look above the Noon Saakinah in Izhar (Clarity)?",
                "choicesList": [
                    "hollow circle (o)",
                    "The head of the letter Khaa",
                    "It has no sign at all (bare letter)",
                    "small Meem"
                ],
                "ans": "The head of the letter Khaa",
                "explanation": "The head of Khaa denotes clear pronunciation."
            },
            {
                "id": "noon_mc_18",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "In which of the following examples does Izhar occur in ONE single word?",
                "choicesList": [
                    "Man Aamana",
                    "Yan'awna",
                    "Min Khawf",
                    "Kullun Aamana"
                ],
                "ans": "Yan'awna",
                "explanation": "Noon and Hamzah meet inside the single word Yan'awna."
            },
            {
                "id": "noon_mc_19",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "How many letters are shared between Izhar and Throat letters (Huruf Halqiyyah)?",
                "choicesList": [
                    "All 6 letters",
                    "Only 3 letters",
                    "4 letters",
                    "None"
                ],
                "ans": "All 6 letters",
                "explanation": "All 6 letters of Izhar are throat letters."
            },
            {
                "id": "noon_mc_20",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "What are the 4 letters of Idgham WITH Ghunnah?",
                "choicesList": [
                    "Yaa, Noon, Meem, Waw",
                    "Laam, Raa",
                    "Hamzah, Haa, Ayn, Haa",
                    "Baa, Taa, Thaa, Jeem"
                ],
                "ans": "Yaa, Noon, Meem, Waw",
                "explanation": "Combined in the word Yanmoo."
            },
            {
                "id": "noon_mc_21",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "What happens to the Noon Saakinah during Complete Idgham WITHOUT Ghunnah (with Laam or Raa)?",
                "choicesList": [
                    "The Noon remains partially heard",
                    "Both the body of the Noon and its Ghunnah completely disappear",
                    "The Noon turns into a Meem",
                    "The Noon is held for 4 counts"
                ],
                "ans": "Both the body of the Noon and its Ghunnah completely disappear",
                "explanation": "Total insertion leaving no trace of the Noon."
            },
            {
                "id": "noon_mc_22",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "Which word is an example of 'Izhar Mutlaq' (Absolute Clarity)?",
                "choicesList": [
                    "Dunya",
                    "Man Yaqool",
                    "Min Waal",
                    "An'amta"
                ],
                "ans": "Dunya",
                "explanation": "Dunya has Noon followed by Yaa inside one word."
            },
            {
                "id": "noon_mc_23",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "Why is Idgham NOT applied in the word 'Dunya'?",
                "choicesList": [
                    "Because the Noon is followed by Waw",
                    "Because the two letters meet in a single word, which would distort the word meaning",
                    "Because it's a non-Arabic word",
                    "Because the Noon has a Fathah"
                ],
                "ans": "Because the two letters meet in a single word, which would distort the word meaning",
                "explanation": "Merging inside one word would confuse it with a doubled letter word."
            },
            {
                "id": "noon_mc_24",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "What does the word 'Iqlab' mean linguistically?",
                "choicesList": [
                    "Clarity",
                    "Turning over / Conversion",
                    "Concealment",
                    "Elevation"
                ],
                "ans": "Turning over / Conversion",
                "explanation": "Iqlab literally means turning or transforming something."
            },
            {
                "id": "noon_mc_25",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "What is the duration of the Ghunnah held during Iqlab and Ikhfaa?",
                "choicesList": [
                    "1 count",
                    "2 counts (Harakataan)",
                    "4 counts",
                    "6 counts"
                ],
                "ans": "2 counts (Harakataan)",
                "explanation": "Ghunnah duration is measured as two vowel counts."
            },
            {
                "id": "noon_mc_26",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "How many letters belong to Ikhfaa Haqeeqi (Real Hiding)?",
                "choicesList": [
                    "6",
                    "12",
                    "15",
                    "28"
                ],
                "ans": "15",
                "explanation": "15 letters of Ikhfaa."
            },
            {
                "id": "noon_mc_27",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "Where is the tongue placed when pronouncing the hidden Noon during Ikhfaa?",
                "choicesList": [
                    "Firmly pressed against the upper gums",
                    "Near the exit point of the following letter without touching firmly",
                    "At the back of the throat",
                    "Outside the mouth"
                ],
                "ans": "Near the exit point of the following letter without touching firmly",
                "explanation": "The tongue readies itself near the next letter's exit point."
            },
            {
                "id": "noon_mc_28",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "Which of the following is a HEAVY letter that makes the Ghunnah of Ikhfaa heavy (Mufakhkham)?",
                "choicesList": [
                    "Saad",
                    "Taa",
                    "Daal",
                    "Seen"
                ],
                "ans": "Saad",
                "explanation": "Saad is one of the 5 heavy Ikhfaa letters."
            },
            {
                "id": "noon_mc_29",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "Which of the following is a LIGHT letter that makes the Ghunnah of Ikhfaa light (Muraqqaq)?",
                "choicesList": [
                    "Taa",
                    "Qaaf",
                    "Zhaa",
                    "Faa"
                ],
                "ans": "Faa",
                "explanation": "Faa is a light letter, requiring a light Ghunnah."
            },
            {
                "id": "noon_mc_30",
                "isTheory": true,
                "categoryId": "noon_sakinah_tanween",
                "categoryTitle": "Noon Saakinah & Tanween",
                "type": "mc",
                "prompt": "In the Mushaf, how is Tanween drawn when it indicates Izhar (Clarity)?",
                "choicesList": [
                    "Parallel and offset from each other",
                    "Tightly aligned / stacked directly on top of each other",
                    "With a small Meem",
                    "Completely missing"
                ],
                "ans": "Tightly aligned / stacked directly on top of each other",
                "explanation": "Directly aligned double strokes denote Izhar."
            }
        ]
    },
    "meem_sakinah": {
        "id": "meem_sakinah",
        "title": "Rules of Meem Saakinah",
        "icon": "🌸",
        "description": "Rules of Ikhfaa Shafawi, Idgham Shafawi, and Izhar Shafawi",
        "questions": [
            {
                "id": "meem_sakinah_tf_1",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Ikhfaa Shafawi means hiding the Meem Saakinah when it is followed by the letter Baa.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Ikhfaa Shafawi occurs when a Meem Saakinah is followed by Baa, with a light nasal sound."
            },
            {
                "id": "meem_sakinah_tf_2",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Ikhfaa Shafawi occurs when Meem Saakinah is followed by Baa.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Baa is the only letter that causes Ikhfaa Shafawi."
            },
            {
                "id": "meem_sakinah_tf_3",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Ikhfaa Shafawi means merging the Meem Saakinah completely into the following letter.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Ikhfaa Shafawi means hiding the Meem Saakinah partially while maintaining its nasal sound."
            },
            {
                "id": "meem_sakinah_tf_4",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Idgham Shafawi means merging one Meem Saakinah into another Meem.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Idgham Shafawi occurs when a Meem Saakinah is followed by another Meem."
            },
            {
                "id": "meem_sakinah_tf_5",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Idgham Shafawi is also called Idgham Mithlayn (Merging of Identical Letters).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The two Meems are identical in their articulation and characteristics."
            },
            {
                "id": "meem_sakinah_tf_6",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Idgham Shafawi occurs when Meem Saakinah is followed by Baa.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Meem Saakinah followed by Baa causes Ikhfaa Shafawi, not Idgham Shafawi."
            },
            {
                "id": "meem_sakinah_tf_7",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Izhar Shafawi means clearly pronouncing the Meem Saakinah.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Izhar Shafawi means pronouncing the Meem Saakinah clearly without merging or hiding it."
            },
            {
                "id": "meem_sakinah_tf_8",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Izhar Shafawi occurs when Meem Saakinah is followed by any letter except Meem and Baa.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Meem and Baa have their own special rules, while the remaining letters cause Izhar Shafawi."
            },
            {
                "id": "meem_sakinah_tf_9",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Meem Saakinah followed by Meem causes Izhar Shafawi.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Meem followed by Meem causes Idgham Shafawi."
            },
            {
                "id": "meem_sakinah_tf_10",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Meem Saakinah followed by Baa causes Ikhfaa Shafawi.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Baa is the specific letter associated with Ikhfaa Shafawi."
            },
            {
                "id": "meem_sakinah_tf_11",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "There are three main rules for Meem Saakinah.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "They are Ikhfaa Shafawi, Idgham Shafawi, and Izhar Shafawi."
            },
            {
                "id": "meem_sakinah_tf_12",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Ikhfaa Shafawi has two letters that cause it: Baa and Meem.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Only Baa causes Ikhfaa Shafawi."
            },
            {
                "id": "meem_sakinah_tf_13",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Idgham Shafawi has only one letter that causes it.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Only another Meem causes Idgham Shafawi."
            },
            {
                "id": "meem_sakinah_tf_14",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Izhar Shafawi occurs with all Arabic letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Izhar Shafawi occurs with all letters except Meem and Baa."
            },
            {
                "id": "meem_sakinah_tf_15",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "The word Shafawi refers to the lips.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "These rules are called Shafawi because the Meem is pronounced from the lips."
            },
            {
                "id": "meem_sakinah_tf_16",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Ikhfaa Shafawi is performed without any nasal sound.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Ikhfaa Shafawi includes a nasal sound associated with the hidden Meem."
            },
            {
                "id": "meem_sakinah_tf_17",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Idgham Shafawi produces a clear separation between the two Meems.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "The first Meem merges into the second Meem."
            },
            {
                "id": "meem_sakinah_tf_18",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "In Idgham Shafawi, the two Meems become one emphasized Meem sound.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The first Meem merges into the second, producing a single emphasized Meem sound."
            },
            {
                "id": "meem_sakinah_tf_19",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "Izhar Shafawi requires the Meem Saakinah to be pronounced clearly.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The Meem remains distinct and is not merged into the following letter."
            },
            {
                "id": "meem_sakinah_tf_20",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "tf",
                "prompt": "The rule of Meem Saakinah depends on the letter that comes before the Meem.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "The rule depends mainly on the letter that follows the Meem Saakinah."
            },
            {
                "id": "meem_sakinah_mc_1",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "What is the rule when Meem Saakinah is followed by Baa?",
                "choicesList": [
                    "Izhar Shafawi (Clear Pronunciation)",
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Idgham Shafawi (Lip Merging)",
                    "Qalqalah (Echoing)"
                ],
                "ans": "Ikhfaa Shafawi (Lip Concealment)",
                "explanation": "Meem Saakinah followed by Baa is pronounced with Ikhfaa Shafawi."
            },
            {
                "id": "meem_sakinah_mc_2",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "What is the rule when Meem Saakinah is followed by another Meem?",
                "choicesList": [
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Izhar Shafawi (Clear Pronunciation)",
                    "Idgham Shafawi (Lip Merging)",
                    "Madd Tabee'ee (Natural Prolongation)"
                ],
                "ans": "Idgham Shafawi (Lip Merging)",
                "explanation": "The first Meem merges into the second Meem."
            },
            {
                "id": "meem_sakinah_mc_3",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "What is the rule when Meem Saakinah is followed by a letter other than Meem or Baa?",
                "choicesList": [
                    "Izhar Shafawi (Clear Pronunciation)",
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Idgham Shafawi (Lip Merging)",
                    "Tafkheem (Heaviness)"
                ],
                "ans": "Izhar Shafawi (Clear Pronunciation)",
                "explanation": "Every letter except Meem and Baa causes Izhar Shafawi after Meem Saakinah."
            },
            {
                "id": "meem_sakinah_mc_4",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "Which letter causes Ikhfaa Shafawi?",
                "choicesList": [
                    "Meem",
                    "Baa",
                    "Noon",
                    "Laam"
                ],
                "ans": "Baa",
                "explanation": "Baa is the only letter that causes Ikhfaa Shafawi."
            },
            {
                "id": "meem_sakinah_mc_5",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "Which letter causes Idgham Shafawi?",
                "choicesList": [
                    "Baa",
                    "Meem",
                    "Raa",
                    "Faa"
                ],
                "ans": "Meem",
                "explanation": "A Meem Saakinah followed by another Meem causes Idgham Shafawi."
            },
            {
                "id": "meem_sakinah_mc_6",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "Which rule means clear pronunciation of Meem Saakinah?",
                "choicesList": [
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Idgham Shafawi (Lip Merging)",
                    "Izhar Shafawi (Clear Pronunciation)",
                    "Qalqalah (Echoing)"
                ],
                "ans": "Izhar Shafawi (Clear Pronunciation)",
                "explanation": "Izhar Shafawi means pronouncing the Meem clearly."
            },
            {
                "id": "meem_sakinah_mc_7",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "How many main rules does Meem Saakinah have?",
                "choicesList": [
                    "One",
                    "Two",
                    "Three",
                    "Four"
                ],
                "ans": "Three",
                "explanation": "The three rules are Ikhfaa Shafawi, Idgham Shafawi, and Izhar Shafawi."
            },
            {
                "id": "meem_sakinah_mc_8",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "What does Shafawi refer to?",
                "choicesList": [
                    "The tongue",
                    "The throat",
                    "The lips",
                    "The nose"
                ],
                "ans": "The lips",
                "explanation": "Shafawi refers to the lips because Meem is pronounced using the lips."
            },
            {
                "id": "meem_sakinah_mc_9",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "Which rule involves hiding the Meem Saakinah partially?",
                "choicesList": [
                    "Izhar Shafawi (Clear Pronunciation)",
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Idgham Shafawi (Lip Merging)",
                    "Qalqalah (Echoing)"
                ],
                "ans": "Ikhfaa Shafawi (Lip Concealment)",
                "explanation": "Ikhfaa Shafawi partially conceals the Meem while retaining its nasal sound."
            },
            {
                "id": "meem_sakinah_mc_10",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "Which rule involves merging one Meem into another Meem?",
                "choicesList": [
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Izhar Shafawi (Clear Pronunciation)",
                    "Idgham Shafawi (Lip Merging)",
                    "Tarqeeq (Lightness)"
                ],
                "ans": "Idgham Shafawi (Lip Merging)",
                "explanation": "The first Meem merges into the second Meem."
            },
            {
                "id": "meem_sakinah_mc_11",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "What happens when Meem Saakinah is followed by Baa?",
                "choicesList": [
                    "The Meem is clearly pronounced",
                    "The Meem is hidden with a nasal sound",
                    "The Meem is completely dropped",
                    "The Meem becomes a Qalqalah letter"
                ],
                "ans": "The Meem is hidden with a nasal sound",
                "explanation": "This is the basic characteristic of Ikhfaa Shafawi."
            },
            {
                "id": "meem_sakinah_mc_12",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "What happens when Meem Saakinah is followed by Meem?",
                "choicesList": [
                    "The Meem is merged into the following Meem",
                    "The Meem is hidden before Baa",
                    "The Meem is pronounced without merging",
                    "The Meem is changed into Noon"
                ],
                "ans": "The Meem is merged into the following Meem",
                "explanation": "This is Idgham Shafawi."
            },
            {
                "id": "meem_sakinah_mc_13",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "Which of the following is NOT a rule of Meem Saakinah?",
                "choicesList": [
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Idgham Shafawi (Lip Merging)",
                    "Izhar Shafawi (Clear Pronunciation)",
                    "Ikhfaa Haqiqi (True Concealment)"
                ],
                "ans": "Ikhfaa Haqiqi (True Concealment)",
                "explanation": "Ikhfaa Haqiqi is a rule of Noon Saakinah and Tanween, not Meem Saakinah."
            },
            {
                "id": "meem_sakinah_mc_14",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "Which rule occurs with all letters except Meem and Baa?",
                "choicesList": [
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Idgham Shafawi (Lip Merging)",
                    "Izhar Shafawi (Clear Pronunciation)",
                    "Idgham Bila Ghunnah (Merging without Nasal Sound)"
                ],
                "ans": "Izhar Shafawi (Clear Pronunciation)",
                "explanation": "Meem and Baa have specific rules, while the remaining letters cause Izhar Shafawi."
            },
            {
                "id": "meem_sakinah_mc_15",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "What is another name for Idgham Shafawi?",
                "choicesList": [
                    "Idgham Mithlayn (Merging of Identical Letters)",
                    "Izhar Halqi (Throat Clarity)",
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Madd Laazim (Compulsory Prolongation)"
                ],
                "ans": "Idgham Mithlayn (Merging of Identical Letters)",
                "explanation": "The two Meems are identical letters, so the merging is called Idgham Mithlayn."
            },
            {
                "id": "meem_sakinah_mc_16",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "Which following letter requires Ikhfaa Shafawi after Meem Saakinah?",
                "choicesList": [
                    "Baa",
                    "Meem",
                    "Laam",
                    "Raa"
                ],
                "ans": "Baa",
                "explanation": "Baa is uniquely associated with Ikhfaa Shafawi."
            },
            {
                "id": "meem_sakinah_mc_17",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "Which following letter requires Idgham Shafawi after Meem Saakinah?",
                "choicesList": [
                    "Baa",
                    "Meem",
                    "Noon",
                    "Seen"
                ],
                "ans": "Meem",
                "explanation": "Another Meem causes Idgham Shafawi."
            },
            {
                "id": "meem_sakinah_mc_18",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "If Meem Saakinah is followed by Laam, which rule applies?",
                "choicesList": [
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Idgham Shafawi (Lip Merging)",
                    "Izhar Shafawi (Clear Pronunciation)",
                    "Qalqalah (Echoing)"
                ],
                "ans": "Izhar Shafawi (Clear Pronunciation)",
                "explanation": "Laam is neither Meem nor Baa, so the Meem is pronounced clearly."
            },
            {
                "id": "meem_sakinah_mc_19",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "If Meem Saakinah is followed by Raa, which rule applies?",
                "choicesList": [
                    "Izhar Shafawi (Clear Pronunciation)",
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Idgham Shafawi (Lip Merging)",
                    "Madd (Prolongation)"
                ],
                "ans": "Izhar Shafawi (Clear Pronunciation)",
                "explanation": "Raa is one of the letters that causes Izhar Shafawi."
            },
            {
                "id": "meem_sakinah_mc_20",
                "isTheory": true,
                "categoryId": "meem_sakinah",
                "categoryTitle": "Rules of Meem Saakinah",
                "type": "mc",
                "prompt": "If Meem Saakinah is followed by Baa, which Tajweed term describes the rule?",
                "choicesList": [
                    "Izhar Shafawi (Clear Pronunciation)",
                    "Ikhfaa Shafawi (Lip Concealment)",
                    "Idgham Shafawi (Lip Merging)",
                    "Iqlab (Conversion)"
                ],
                "ans": "Ikhfaa Shafawi (Lip Concealment)",
                "explanation": "Baa causes the Meem Saakinah to be concealed with a nasal sound."
            }
        ]
    },
    "qalqalah": {
        "id": "qalqalah",
        "title": "Qalqalah (Echoing Sound)",
        "icon": "🔔",
        "description": "Echoing letters (Qutb Jad), conditions of Sukoon, and degrees of Qalqalah",
        "questions": [
            {
                "id": "qalqalah_tf_1",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Qalqalah means producing an echoing or bouncing sound from a letter with a Sukoon.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Qalqalah is a slight echoing sound produced when one of its five letters has Sukoon."
            },
            {
                "id": "qalqalah_tf_2",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Qalqalah has five letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The five Qalqalah letters are Qaf, Taa, Baa, Jeem, and Daal."
            },
            {
                "id": "qalqalah_tf_3",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "The Qalqalah letters are Qaf, Taa, Baa, Jeem, and Daal.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "These five letters are the established letters of Qalqalah."
            },
            {
                "id": "qalqalah_tf_4",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Qalqalah is performed on every letter of the alphabet.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Qalqalah applies only to its five specific letters when the required Sukoon condition is present."
            },
            {
                "id": "qalqalah_tf_5",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Qaf is one of the Qalqalah letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Qaf is one of the five letters of Qalqalah."
            },
            {
                "id": "qalqalah_tf_6",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Taa is one of the Qalqalah letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Taa is one of the five Qalqalah letters."
            },
            {
                "id": "qalqalah_tf_7",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Baa is one of the Qalqalah letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Baa is one of the five Qalqalah letters."
            },
            {
                "id": "qalqalah_tf_8",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Jeem is one of the Qalqalah letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Jeem is one of the five Qalqalah letters."
            },
            {
                "id": "qalqalah_tf_9",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Daal is one of the Qalqalah letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Daal is one of the five Qalqalah letters."
            },
            {
                "id": "qalqalah_tf_10",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Raa is one of the Qalqalah letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Raa is not one of the five Qalqalah letters."
            },
            {
                "id": "qalqalah_tf_11",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Seen is one of the Qalqalah letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Seen is not a Qalqalah letter."
            },
            {
                "id": "qalqalah_tf_12",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Qalqalah can occur when a Qalqalah letter has a permanent Sukoon.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "A Qalqalah letter with its original Sukoon produces Qalqalah Sughra (Minor Qalqalah)."
            },
            {
                "id": "qalqalah_tf_13",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Qalqalah Sughra (Minor Qalqalah) is generally weaker than Qalqalah Kubra (Major Qalqalah).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Qalqalah Sughra occurs with a Qalqalah letter having its original Sukoon and has less strength than stopping on such a letter."
            },
            {
                "id": "qalqalah_tf_14",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Qalqalah Kubra (Major Qalqalah) occurs when stopping causes a Qalqalah letter to become Saakin.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "When stopping creates a temporary Sukoon on a Qalqalah letter, the Qalqalah is stronger and is called Kubra."
            },
            {
                "id": "qalqalah_tf_15",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "tf",
                "prompt": "Qalqalah Kubra (Major Qalqalah) is stronger than Qalqalah Sughra (Minor Qalqalah).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The stopping position produces a stronger Qalqalah than an original Sukoon in the middle of recitation."
            },
            {
                "id": "qalqalah_mc_1",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "What does Qalqalah mean?",
                "choicesList": [
                    "Echoing or bouncing",
                    "Prolongation",
                    "Merging",
                    "Lightening"
                ],
                "ans": "Echoing or bouncing",
                "explanation": "Qalqalah is the slight echoing or bouncing sound of specific Saakin letters."
            },
            {
                "id": "qalqalah_mc_2",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "How many letters of Qalqalah are there?",
                "choicesList": [
                    "Three",
                    "Four",
                    "Five",
                    "Six"
                ],
                "ans": "Five",
                "explanation": "Qalqalah has five letters: Qaf, Taa, Baa, Jeem, and Daal."
            },
            {
                "id": "qalqalah_mc_3",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "Which of the following is a Qalqalah letter?",
                "choicesList": [
                    "Qaf",
                    "Raa",
                    "Seen",
                    "Laam"
                ],
                "ans": "Qaf",
                "explanation": "Qaf is one of the five Qalqalah letters."
            },
            {
                "id": "qalqalah_mc_4",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "Which of the following is a Qalqalah letter?",
                "choicesList": [
                    "Meem",
                    "Taa",
                    "Noon",
                    "Faa"
                ],
                "ans": "Taa",
                "explanation": "Taa is one of the five Qalqalah letters."
            },
            {
                "id": "qalqalah_mc_5",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "Which of the following is a Qalqalah letter?",
                "choicesList": [
                    "Baa",
                    "Khaa",
                    "Raa",
                    "Seen"
                ],
                "ans": "Baa",
                "explanation": "Baa is one of the five Qalqalah letters."
            },
            {
                "id": "qalqalah_mc_6",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "Which of the following is a Qalqalah letter?",
                "choicesList": [
                    "Jeem",
                    "Haa",
                    "Meem",
                    "Waw"
                ],
                "ans": "Jeem",
                "explanation": "Jeem is one of the five Qalqalah letters."
            },
            {
                "id": "qalqalah_mc_7",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "Which of the following is a Qalqalah letter?",
                "choicesList": [
                    "Daal",
                    "Laam",
                    "Noon",
                    "Raa"
                ],
                "ans": "Daal",
                "explanation": "Daal is one of the five Qalqalah letters."
            },
            {
                "id": "qalqalah_mc_8",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "Which of the following is NOT a Qalqalah letter?",
                "choicesList": [
                    "Qaf",
                    "Jeem",
                    "Daal",
                    "Raa"
                ],
                "ans": "Raa",
                "explanation": "Raa is not one of the five Qalqalah letters."
            },
            {
                "id": "qalqalah_mc_9",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "Which of the following is NOT a Qalqalah letter?",
                "choicesList": [
                    "Baa",
                    "Taa",
                    "Seen",
                    "Qaf"
                ],
                "ans": "Seen",
                "explanation": "Seen is not a Qalqalah letter."
            },
            {
                "id": "qalqalah_mc_10",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "When does a Qalqalah letter normally receive Qalqalah?",
                "choicesList": [
                    "When it has Sukoon",
                    "When it has Fathah",
                    "When it has Kasrah",
                    "When it has Dammah"
                ],
                "ans": "When it has Sukoon",
                "explanation": "Qalqalah is produced when one of its five letters is Saakin."
            },
            {
                "id": "qalqalah_mc_11",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "What is Qalqalah Sughra (Minor Qalqalah)?",
                "choicesList": [
                    "Qalqalah caused by an original Sukoon",
                    "Qalqalah caused only by a doubled letter",
                    "Qalqalah caused by Madd",
                    "Qalqalah caused by a vowel"
                ],
                "ans": "Qalqalah caused by an original Sukoon",
                "explanation": "Qalqalah Sughra occurs when a Qalqalah letter has its original Sukoon."
            },
            {
                "id": "qalqalah_mc_12",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "What is Qalqalah Kubra (Major Qalqalah) commonly associated with?",
                "choicesList": [
                    "Stopping on a Qalqalah letter",
                    "Starting with a vowel",
                    "Merging two letters",
                    "Prolonging a vowel"
                ],
                "ans": "Stopping on a Qalqalah letter",
                "explanation": "Stopping can create a temporary Sukoon on the Qalqalah letter and strengthen the Qalqalah."
            },
            {
                "id": "qalqalah_mc_13",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "Which is stronger?",
                "choicesList": [
                    "Qalqalah Sughra (Minor Qalqalah)",
                    "Qalqalah Kubra (Major Qalqalah)",
                    "Both are always identical",
                    "Neither has a sound"
                ],
                "ans": "Qalqalah Kubra (Major Qalqalah)",
                "explanation": "Qalqalah Kubra is stronger because stopping creates a temporary Sukoon."
            },
            {
                "id": "qalqalah_mc_14",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "What is Qalqalah Akbar (Greater Qalqalah) associated with?",
                "choicesList": [
                    "A doubled Qalqalah letter when stopping",
                    "A Qalqalah letter with Fathah",
                    "Any letter with Kasrah",
                    "A Madd letter"
                ],
                "ans": "A doubled Qalqalah letter when stopping",
                "explanation": "Qalqalah Akbar is the strongest level and is associated with stopping on a doubled Qalqalah letter."
            },
            {
                "id": "qalqalah_mc_15",
                "isTheory": true,
                "categoryId": "qalqalah",
                "categoryTitle": "Qalqalah (Echoing Sound)",
                "type": "mc",
                "prompt": "Which sequence lists all five Qalqalah letters correctly?",
                "choicesList": [
                    "Qaf, Taa, Baa, Jeem, Daal",
                    "Qaf, Raa, Meem, Jeem, Daal",
                    "Taa, Seen, Baa, Laam, Daal",
                    "Qaf, Taa, Noon, Jeem, Raa"
                ],
                "ans": "Qaf, Taa, Baa, Jeem, Daal",
                "explanation": "These are the five established Qalqalah letters."
            }
        ]
    },
    "madd_rules": {
        "id": "madd_rules",
        "title": "Madd Rules (Natural & Secondary)",
        "icon": "🌊",
        "description": "Natural prolongation, Muttasil, Munfasil, and Badal prolongations",
        "questions": [
            {
                "id": "madd_rules_tf_1",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Tabee'ee (Natural Prolongation) is the basic type of Madd and normally lasts for two counts.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Madd Tabee'ee is naturally prolonged for two counts when its conditions are met."
            },
            {
                "id": "madd_rules_tf_2",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Tabee'ee (Natural Prolongation) requires a Hamzah or a Sukoon after the Madd letter.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Madd Tabee'ee occurs without a following Hamzah or Sukoon that creates a secondary Madd."
            },
            {
                "id": "madd_rules_tf_3",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "The three Madd letters are Alif, Waw, and Yaa when they function as Madd letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "These three letters can function as Madd letters when their required conditions are present."
            },
            {
                "id": "madd_rules_tf_4",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Muttasil (Connected Prolongation) occurs when a Madd letter is followed by Hamzah in the same word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The Madd letter and Hamzah occur within the same word in Madd Muttasil."
            },
            {
                "id": "madd_rules_tf_5",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Muttasil (Connected Prolongation) occurs when the Madd letter and Hamzah are in separate words.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "A Madd letter followed by Hamzah in a different word is Madd Munfasil (Separated Prolongation)."
            },
            {
                "id": "madd_rules_tf_6",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Munfasil (Separated Prolongation) occurs when a Madd letter is at the end of one word and Hamzah begins the next word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The Madd and Hamzah are separated by a word boundary."
            },
            {
                "id": "madd_rules_tf_7",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Muttasil (Connected Prolongation) and Madd Munfasil (Separated Prolongation) both involve Hamzah.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The difference is whether the Hamzah occurs in the same word or the next word."
            },
            {
                "id": "madd_rules_tf_8",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Muttasil (Connected Prolongation) is called connected because the Madd letter and Hamzah occur in the same word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The two elements are connected within one word."
            },
            {
                "id": "madd_rules_tf_9",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Munfasil (Separated Prolongation) means that the Madd letter and Hamzah occur in the same word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "They occur in two separate words."
            },
            {
                "id": "madd_rules_tf_10",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon) occurs because of stopping at the end of a word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Stopping can create a temporary Sukoon after a Madd letter."
            },
            {
                "id": "madd_rules_tf_11",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "The Sukoon in Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon) is always original.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "The Sukoon is temporary because it results from stopping."
            },
            {
                "id": "madd_rules_tf_12",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon) can be read with two, four, or six counts when stopping.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The recognized stopping lengths for this Madd are two, four, or six counts."
            },
            {
                "id": "madd_rules_tf_13",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Badal (Substitute Prolongation) occurs when a Hamzah comes before a Madd letter in the same word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "In Madd Badal, the Hamzah precedes the Madd letter."
            },
            {
                "id": "madd_rules_tf_14",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Badal (Substitute Prolongation) is normally prolonged for two counts in Hafs from Asim.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Madd Badal is normally read for two counts in the narration of Hafs from Asim."
            },
            {
                "id": "madd_rules_tf_15",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Leen (Soft Prolongation) involves Waw or Yaa with Sukoon preceded by Fathah.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "A Saakin Waw or Yaa preceded by Fathah forms the basis of Madd Leen."
            },
            {
                "id": "madd_rules_tf_16",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Leen (Soft Prolongation) occurs only when continuing without stopping.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Madd Leen is specifically relevant when stopping and can be prolonged two, four, or six counts."
            },
            {
                "id": "madd_rules_tf_17",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Leen (Soft Prolongation) can be prolonged for two, four, or six counts when stopping.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "These three lengths are permitted when stopping on the relevant word."
            },
            {
                "id": "madd_rules_tf_18",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Silah Sughra (Short Connecting Prolongation) is related to the pronoun Haa when it occurs between two vowels and is not followed by Hamzah.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Silah Sughra applies to the qualifying pronoun Haa when the required surrounding-vowel conditions are present and the next letter is not Hamzah."
            },
            {
                "id": "madd_rules_tf_19",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Silah Kubra (Long Connecting Prolongation) occurs when the qualifying pronoun Haa is followed by Hamzah.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The presence of Hamzah after the qualifying Haa makes the Silah Kubra."
            },
            {
                "id": "madd_rules_tf_20",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Silah Sughra (Short Connecting Prolongation) is normally two counts.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The connecting sound is extended for two counts when its conditions are met."
            },
            {
                "id": "madd_rules_tf_21",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Silah Kubra (Long Connecting Prolongation) has the same length as Madd Tabee'ee (Natural Prolongation).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Madd Silah Kubra is a secondary Madd and is longer than the natural two-count Madd."
            },
            {
                "id": "madd_rules_tf_22",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "The difference between Silah Sughra and Silah Kubra is related to whether Hamzah follows the qualifying Haa.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Without a following Hamzah it is Sughra, while a following Hamzah makes it Kubra."
            },
            {
                "id": "madd_rules_tf_23",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Muttasil (Connected Prolongation) is caused by a Hamzah after a Madd letter within the same word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "This same-word relationship defines Madd Muttasil."
            },
            {
                "id": "madd_rules_tf_24",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Munfasil (Separated Prolongation) is caused by a Hamzah before the Madd letter in the same word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "That description does not define Madd Munfasil."
            },
            {
                "id": "madd_rules_tf_25",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Tabee'ee (Natural Prolongation) is the foundation from which secondary Madd types are distinguished.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Secondary Madd involves an additional cause such as Hamzah or Sukoon beyond the natural Madd condition."
            },
            {
                "id": "madd_rules_tf_26",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon) can occur only when the reciter stops.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The temporary Sukoon is created by stopping."
            },
            {
                "id": "madd_rules_tf_27",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Badal (Substitute Prolongation) requires stopping at the end of a word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Madd Badal is not dependent on stopping."
            },
            {
                "id": "madd_rules_tf_28",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Leen (Soft Prolongation) and Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon) can both have two, four, or six counts when stopping.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Both can take these three lengths in the appropriate stopping situations."
            },
            {
                "id": "madd_rules_tf_29",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Madd Muttasil (Connected Prolongation) and Madd Munfasil (Separated Prolongation) are distinguished by whether the Hamzah is in the same word or a separate word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Same word is Muttasil, while separate words are Munfasil."
            },
            {
                "id": "madd_rules_tf_30",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "tf",
                "prompt": "Every Madd rule has exactly the same cause and exactly the same permitted length.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Madd rules differ in their causes, conditions, and permitted lengths."
            },
            {
                "id": "madd_rules_mc_1",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "What is Madd Tabee'ee (Natural Prolongation)?",
                "choicesList": [
                    "A natural two-count prolongation",
                    "A six-count prolongation caused by stopping",
                    "A prolongation caused by Hamzah in the next word",
                    "A prolongation caused by a doubled letter"
                ],
                "ans": "A natural two-count prolongation",
                "explanation": "Madd Tabee'ee is the basic Madd and is normally two counts."
            },
            {
                "id": "madd_rules_mc_2",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which of the following is a condition for Madd Tabee'ee (Natural Prolongation)?",
                "choicesList": [
                    "A following Hamzah must be present",
                    "A following original Sukoon must be present",
                    "No secondary cause of Hamzah or Sukoon is present",
                    "The reciter must stop"
                ],
                "ans": "No secondary cause of Hamzah or Sukoon is present",
                "explanation": "Natural Madd occurs when the basic Madd conditions are present without a secondary cause."
            },
            {
                "id": "madd_rules_mc_3",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "How many counts is Madd Tabee'ee (Natural Prolongation) normally?",
                "choicesList": [
                    "One",
                    "Two",
                    "Four",
                    "Six"
                ],
                "ans": "Two",
                "explanation": "Madd Tabee'ee is read for two counts."
            },
            {
                "id": "madd_rules_mc_4",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "What defines Madd Muttasil (Connected Prolongation)?",
                "choicesList": [
                    "Madd letter followed by Hamzah in the same word",
                    "Madd letter followed by Hamzah in the next word",
                    "Madd letter followed by temporary Sukoon only",
                    "Hamzah followed by a Madd letter"
                ],
                "ans": "Madd letter followed by Hamzah in the same word",
                "explanation": "The Madd letter and Hamzah occur within the same word."
            },
            {
                "id": "madd_rules_mc_5",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "What defines Madd Munfasil (Separated Prolongation)?",
                "choicesList": [
                    "Hamzah before Madd in the same word",
                    "Madd letter followed by Hamzah in the next word",
                    "Madd letter followed by permanent Sukoon",
                    "Waw with Sukoon after Fathah"
                ],
                "ans": "Madd letter followed by Hamzah in the next word",
                "explanation": "The Madd and Hamzah are separated by a word boundary."
            },
            {
                "id": "madd_rules_mc_6",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which statement correctly compares Muttasil and Munfasil?",
                "choicesList": [
                    "Muttasil has Hamzah in another word, while Munfasil has Hamzah in the same word",
                    "Both always have Hamzah in the same word",
                    "Muttasil has Hamzah in the same word, while Munfasil has Hamzah in another word",
                    "Neither involves Hamzah"
                ],
                "ans": "Muttasil has Hamzah in the same word, while Munfasil has Hamzah in another word",
                "explanation": "The word boundary is the key difference between the two Madd types."
            },
            {
                "id": "madd_rules_mc_7",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "What causes Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon)?",
                "choicesList": [
                    "A permanent Sukoon",
                    "A temporary Sukoon created by stopping",
                    "A Hamzah before a Madd letter",
                    "A doubled letter in the middle of a word"
                ],
                "ans": "A temporary Sukoon created by stopping",
                "explanation": "Stopping produces the temporary Sukoon that causes this Madd."
            },
            {
                "id": "madd_rules_mc_8",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which lengths are permitted for Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon) when stopping?",
                "choicesList": [
                    "Two only",
                    "Three only",
                    "Two, four, or six",
                    "Six only"
                ],
                "ans": "Two, four, or six",
                "explanation": "All three lengths are permitted when stopping."
            },
            {
                "id": "madd_rules_mc_9",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "What is special about the Sukoon in Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon)?",
                "choicesList": [
                    "It is created by stopping",
                    "It is always original",
                    "It occurs before the Madd letter",
                    "It belongs only to Hamzah"
                ],
                "ans": "It is created by stopping",
                "explanation": "The Sukoon is temporary because it results from stopping."
            },
            {
                "id": "madd_rules_mc_10",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "What is Madd Badal (Substitute Prolongation)?",
                "choicesList": [
                    "Hamzah before a Madd letter",
                    "Madd letter before Hamzah in another word",
                    "A temporary Sukoon after stopping",
                    "A Saakin Waw after Fathah"
                ],
                "ans": "Hamzah before a Madd letter",
                "explanation": "In Madd Badal, the Hamzah precedes the Madd letter."
            },
            {
                "id": "madd_rules_mc_11",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "How long is Madd Badal (Substitute Prolongation) normally read in Hafs from Asim?",
                "choicesList": [
                    "Two counts",
                    "Three counts",
                    "Four counts",
                    "Six counts"
                ],
                "ans": "Two counts",
                "explanation": "Madd Badal is normally prolonged for two counts in Hafs from Asim."
            },
            {
                "id": "madd_rules_mc_12",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "What is required for Madd Leen (Soft Prolongation)?",
                "choicesList": [
                    "Saakin Waw or Yaa preceded by Fathah",
                    "Saakin Alif preceded by Kasrah",
                    "Hamzah before Waw",
                    "Doubled Yaa"
                ],
                "ans": "Saakin Waw or Yaa preceded by Fathah",
                "explanation": "Madd Leen is formed by a Saakin Waw or Yaa preceded by Fathah."
            },
            {
                "id": "madd_rules_mc_13",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "When is Madd Leen (Soft Prolongation) relevant as a prolonged Madd?",
                "choicesList": [
                    "When stopping",
                    "Only when starting",
                    "Only after Hamzah",
                    "Only in the middle of a word"
                ],
                "ans": "When stopping",
                "explanation": "The prolonged form of Madd Leen occurs when stopping creates the relevant temporary Sukoon."
            },
            {
                "id": "madd_rules_mc_14",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "What lengths can Madd Leen (Soft Prolongation) take when stopping?",
                "choicesList": [
                    "Two only",
                    "Four only",
                    "Six only",
                    "Two, four, or six"
                ],
                "ans": "Two, four, or six",
                "explanation": "These three lengths are permitted when stopping."
            },
            {
                "id": "madd_rules_mc_15",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "What is Madd Silah Sughra (Short Connecting Prolongation) related to?",
                "choicesList": [
                    "A qualifying pronoun Haa between two vowels without a following Hamzah",
                    "A Madd letter followed by Hamzah in the same word",
                    "A Qalqalah letter at the end of a word",
                    "A Hamzah before a Madd letter"
                ],
                "ans": "A qualifying pronoun Haa between two vowels without a following Hamzah",
                "explanation": "Silah Sughra applies to the qualifying Haa under its required conditions when Hamzah does not follow."
            },
            {
                "id": "madd_rules_mc_16",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "How long is Madd Silah Sughra (Short Connecting Prolongation)?",
                "choicesList": [
                    "One count",
                    "Two counts",
                    "Four counts",
                    "Six counts"
                ],
                "ans": "Two counts",
                "explanation": "Silah Sughra is read with a two-count connecting sound."
            },
            {
                "id": "madd_rules_mc_17",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "What makes Madd Silah Kubra (Long Connecting Prolongation) different from Silah Sughra?",
                "choicesList": [
                    "A Hamzah follows the qualifying Haa",
                    "The word contains Qalqalah",
                    "The reciter stops",
                    "The Haa is always Saakin"
                ],
                "ans": "A Hamzah follows the qualifying Haa",
                "explanation": "A following Hamzah changes the Silah from Sughra to Kubra."
            },
            {
                "id": "madd_rules_mc_18",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which Madd is connected to a pronoun Haa followed by Hamzah?",
                "choicesList": [
                    "Madd Silah Sughra (Short Connecting Prolongation)",
                    "Madd Silah Kubra (Long Connecting Prolongation)",
                    "Madd Badal (Substitute Prolongation)",
                    "Madd Leen (Soft Prolongation)"
                ],
                "ans": "Madd Silah Kubra (Long Connecting Prolongation)",
                "explanation": "A following Hamzah makes the qualifying Silah Kubra."
            },
            {
                "id": "madd_rules_mc_19",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which Madd normally has a two-count length and involves a Hamzah before the Madd letter?",
                "choicesList": [
                    "Madd Badal (Substitute Prolongation)",
                    "Madd Muttasil (Connected Prolongation)",
                    "Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon)",
                    "Madd Leen (Soft Prolongation)"
                ],
                "ans": "Madd Badal (Substitute Prolongation)",
                "explanation": "Madd Badal has Hamzah before the Madd letter and is normally two counts."
            },
            {
                "id": "madd_rules_mc_20",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which Madd involves Hamzah after the Madd letter in the same word?",
                "choicesList": [
                    "Madd Badal (Substitute Prolongation)",
                    "Madd Munfasil (Separated Prolongation)",
                    "Madd Muttasil (Connected Prolongation)",
                    "Madd Tabee'ee (Natural Prolongation)"
                ],
                "ans": "Madd Muttasil (Connected Prolongation)",
                "explanation": "Same-word Madd followed by Hamzah is Madd Muttasil."
            },
            {
                "id": "madd_rules_mc_21",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which Madd involves Hamzah at the beginning of the next word?",
                "choicesList": [
                    "Madd Muttasil (Connected Prolongation)",
                    "Madd Munfasil (Separated Prolongation)",
                    "Madd Badal (Substitute Prolongation)",
                    "Madd Leen (Soft Prolongation)"
                ],
                "ans": "Madd Munfasil (Separated Prolongation)",
                "explanation": "Madd Munfasil occurs when the Madd letter is at the end of one word and Hamzah begins the next."
            },
            {
                "id": "madd_rules_mc_22",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which Madd is caused by stopping and creating a temporary Sukoon?",
                "choicesList": [
                    "Madd Tabee'ee (Natural Prolongation)",
                    "Madd Badal (Substitute Prolongation)",
                    "Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon)",
                    "Madd Muttasil (Connected Prolongation)"
                ],
                "ans": "Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon)",
                "explanation": "The temporary Sukoon created by stopping causes this Madd."
            },
            {
                "id": "madd_rules_mc_23",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which Madd involves a Saakin Waw or Yaa preceded by Fathah?",
                "choicesList": [
                    "Madd Leen (Soft Prolongation)",
                    "Madd Badal (Substitute Prolongation)",
                    "Madd Munfasil (Separated Prolongation)",
                    "Madd Silah Kubra (Long Connecting Prolongation)"
                ],
                "ans": "Madd Leen (Soft Prolongation)",
                "explanation": "This combination creates the basis of Madd Leen."
            },
            {
                "id": "madd_rules_mc_24",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which Madd is normally two counts and has no secondary cause?",
                "choicesList": [
                    "Madd Tabee'ee (Natural Prolongation)",
                    "Madd Muttasil (Connected Prolongation)",
                    "Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon)",
                    "Madd Silah Kubra (Long Connecting Prolongation)"
                ],
                "ans": "Madd Tabee'ee (Natural Prolongation)",
                "explanation": "Madd Tabee'ee is the basic natural Madd without a secondary cause."
            },
            {
                "id": "madd_rules_mc_25",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which pair is correctly matched?",
                "choicesList": [
                    "Muttasil — Hamzah in the next word",
                    "Munfasil — Hamzah in the same word",
                    "Badal — Hamzah before the Madd letter",
                    "Leen — Hamzah before the Madd letter"
                ],
                "ans": "Badal — Hamzah before the Madd letter",
                "explanation": "Madd Badal is characterized by Hamzah preceding the Madd letter."
            },
            {
                "id": "madd_rules_mc_26",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which pair is correctly matched?",
                "choicesList": [
                    "Silah Sughra — followed by Hamzah",
                    "Silah Kubra — followed by Hamzah",
                    "Leen — Saakin Waw or Yaa preceded by Kasrah",
                    "'Aarid Li-Sukoon — permanent Sukoon"
                ],
                "ans": "Silah Kubra — followed by Hamzah",
                "explanation": "A following Hamzah is the key feature that makes Silah Kubra."
            },
            {
                "id": "madd_rules_mc_27",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which Madd can have two, four, or six counts when stopping?",
                "choicesList": [
                    "Madd Tabee'ee (Natural Prolongation)",
                    "Madd Badal (Substitute Prolongation)",
                    "Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon)",
                    "Madd Silah Sughra (Short Connecting Prolongation)"
                ],
                "ans": "Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon)",
                "explanation": "When stopping, Madd 'Aarid Li-Sukoon may be read two, four, or six counts."
            },
            {
                "id": "madd_rules_mc_28",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which statement about Madd Leen (Soft Prolongation) is correct?",
                "choicesList": [
                    "It requires a Saakin Waw or Yaa preceded by Fathah",
                    "It requires Hamzah before the Madd letter",
                    "It always lasts six counts",
                    "It occurs only with Alif"
                ],
                "ans": "It requires a Saakin Waw or Yaa preceded by Fathah",
                "explanation": "This is the defining letter condition for Madd Leen."
            },
            {
                "id": "madd_rules_mc_29",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which statement correctly describes Silah Sughra and Silah Kubra?",
                "choicesList": [
                    "Sughra has a following Hamzah, while Kubra does not",
                    "Sughra does not have a following Hamzah, while Kubra does",
                    "Both require stopping",
                    "Neither is related to the pronoun Haa"
                ],
                "ans": "Sughra does not have a following Hamzah, while Kubra does",
                "explanation": "The presence of a following Hamzah distinguishes Silah Kubra from Silah Sughra."
            },
            {
                "id": "madd_rules_mc_30",
                "isTheory": true,
                "categoryId": "madd_rules",
                "categoryTitle": "Madd Rules (Natural & Secondary)",
                "type": "mc",
                "prompt": "Which statement best summarizes the Madd rules in this topic?",
                "choicesList": [
                    "All Madd types are always two counts",
                    "Secondary Madd can be caused by Hamzah or Sukoon, while Natural Madd has no such secondary cause",
                    "All Madd types require stopping",
                    "Madd only occurs with Hamzah"
                ],
                "ans": "Secondary Madd can be caused by Hamzah or Sukoon, while Natural Madd has no such secondary cause",
                "explanation": "The main distinction is between the basic Natural Madd and secondary Madd caused by factors such as Hamzah or Sukoon."
            }
        ]
    },
    "madd_laazim": {
        "id": "madd_laazim",
        "title": "Madd Laazim (Compulsory Prolongation)",
        "icon": "⏱️",
        "description": "6-count compulsory prolongation (Kalimee & Harfee, Mukhaffaf & Muthaqqal)",
        "questions": [
            {
                "id": "madd_laazim_tf_1",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim (Compulsory Prolongation) is a type of Madd that is extended for six counts in the narration of Hafs from Asim.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Madd Laazim is read for six counts when its conditions are present."
            },
            {
                "id": "madd_laazim_tf_2",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim (Compulsory Prolongation) is caused by an original Sukoon following a Madd letter.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The permanent Sukoon is the defining cause of Madd Laazim."
            },
            {
                "id": "madd_laazim_tf_3",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "The Sukoon in Madd Laazim (Compulsory Prolongation) is temporary and exists only because of stopping.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "The Sukoon of Madd Laazim is permanent and exists whether the reciter stops or continues."
            },
            {
                "id": "madd_laazim_tf_4",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim (Compulsory Prolongation) is always six counts in Hafs from Asim.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Madd Laazim has a fixed length of six counts in this narration."
            },
            {
                "id": "madd_laazim_tf_5",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim is divided into Kalimi (Word-Based) and Harfi (Letter-Based).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Madd Laazim has two main categories based on whether it occurs in a word or an individual letter."
            },
            {
                "id": "madd_laazim_tf_6",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Kalimi (Word-Based) Madd Laazim occurs within a word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Kalimi means the Madd Laazim occurs within a word."
            },
            {
                "id": "madd_laazim_tf_7",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Harfi (Letter-Based) Madd Laazim occurs in the letter names found at the beginning of certain chapters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Harfi Madd Laazim occurs in specific opening letter names."
            },
            {
                "id": "madd_laazim_tf_8",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Kalimi (Word-Based Compulsory Prolongation) has two types: Muthaqqal (Heavy) and Mukhaffaf (Light).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The word-based category is divided into Muthaqqal and Mukhaffaf."
            },
            {
                "id": "madd_laazim_tf_9",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Harfi (Letter-Based Compulsory Prolongation) has two types: Muthaqqal (Heavy) and Mukhaffaf (Light).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The letter-based category is also divided into Muthaqqal and Mukhaffaf."
            },
            {
                "id": "madd_laazim_tf_10",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Muthaqqal (Heavy) means that the Madd is followed by an original Sukoon associated with merging.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The heavy type is connected with a permanent Sukoon occurring through Idgham (Merging)."
            },
            {
                "id": "madd_laazim_tf_11",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Mukhaffaf (Light) means that the permanent Sukoon is not associated with Idgham (Merging).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The light type has the permanent Sukoon without the merging feature found in Muthaqqal."
            },
            {
                "id": "madd_laazim_tf_12",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Kalimi Muthaqqal (Heavy Word-Based Compulsory Prolongation) contains a permanent Sukoon after the Madd letter.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The permanent Sukoon following the Madd letter makes it Madd Laazim."
            },
            {
                "id": "madd_laazim_tf_13",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Kalimi Mukhaffaf (Light Word-Based Compulsory Prolongation) is a six-count Madd.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Both Kalimi Muthaqqal and Kalimi Mukhaffaf are read for six counts."
            },
            {
                "id": "madd_laazim_tf_14",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Harfi Muthaqqal (Heavy Letter-Based Compulsory Prolongation) occurs in a normal word rather than an opening letter name.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Harfi Madd Laazim occurs in the names of certain opening letters."
            },
            {
                "id": "madd_laazim_tf_15",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Harfi Mukhaffaf (Light Letter-Based Compulsory Prolongation) is related to certain opening letters of chapters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The Harfi category occurs in the opening letter names of certain chapters."
            },
            {
                "id": "madd_laazim_tf_16",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "The four main types of Madd Laazim are Kalimi Muthaqqal, Kalimi Mukhaffaf, Harfi Muthaqqal, and Harfi Mukhaffaf.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "These are the four classifications of Madd Laazim."
            },
            {
                "id": "madd_laazim_tf_17",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Kalimi Muthaqqal (Heavy Word-Based Compulsory Prolongation) is caused by a temporary Sukoon.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Its Sukoon is permanent and does not depend on stopping."
            },
            {
                "id": "madd_laazim_tf_18",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim can be reduced to two counts when the reciter continues instead of stopping.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Madd Laazim remains six counts whether the reciter stops or continues."
            },
            {
                "id": "madd_laazim_tf_19",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim differs from Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon) because its Sukoon is permanent.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Madd 'Aarid Li-Sukoon has a temporary Sukoon caused by stopping, while Madd Laazim has an original Sukoon."
            },
            {
                "id": "madd_laazim_tf_20",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim is longer than Madd Tabee'ee (Natural Prolongation).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Madd Tabee'ee is two counts, while Madd Laazim is six counts."
            },
            {
                "id": "madd_laazim_tf_21",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Kalimi (Word-Based Compulsory Prolongation) is identified by looking at the actual word containing the Madd and permanent Sukoon.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The Kalimi category is determined by the occurrence within a word."
            },
            {
                "id": "madd_laazim_tf_22",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Harfi (Letter-Based Compulsory Prolongation) refers to every letter in the Quran.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "It occurs only in specific opening letter names whose structures meet the conditions of Madd Laazim."
            },
            {
                "id": "madd_laazim_tf_23",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Muthaqqal (Heavy) and Mukhaffaf (Light) describe the type of Madd Laazim, not whether the Madd letter itself is heavy or light.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "These terms classify the structure following the Madd rather than the heaviness of the Madd letter itself."
            },
            {
                "id": "madd_laazim_tf_24",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Kalimi Muthaqqal (Heavy Word-Based Compulsory Prolongation) involves Idgham (Merging).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The heavy word-based type has a permanent Sukoon connected with merging."
            },
            {
                "id": "madd_laazim_tf_25",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Kalimi Mukhaffaf (Light Word-Based Compulsory Prolongation) involves Idgham (Merging).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "The light word-based type has the permanent Sukoon without Idgham."
            },
            {
                "id": "madd_laazim_tf_26",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Harfi Muthaqqal (Heavy Letter-Based Compulsory Prolongation) contains a permanent Sukoon associated with Idgham (Merging).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The heavy letter-based type has the permanent Sukoon with a merging relationship."
            },
            {
                "id": "madd_laazim_tf_27",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim Harfi Mukhaffaf (Light Letter-Based Compulsory Prolongation) contains a permanent Sukoon without Idgham (Merging).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "This is the defining distinction of the light letter-based type."
            },
            {
                "id": "madd_laazim_tf_28",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "The word-based and letter-based categories are distinguished by whether the Madd Laazim occurs in a word or in a letter name.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Kalimi refers to a word, while Harfi refers to an individual opening letter name."
            },
            {
                "id": "madd_laazim_tf_29",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "Madd Laazim has a fixed six-count length and therefore does not have the two/four/six-count choices of Madd 'Aarid Li-Sukoon.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Madd Laazim is fixed at six counts, unlike the variable lengths of Madd 'Aarid Li-Sukoon."
            },
            {
                "id": "madd_laazim_tf_30",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "tf",
                "prompt": "The correct classification of Madd Laazim depends on both its location and the nature of the permanent Sukoon.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The location determines Kalimi or Harfi, while the structure of the Sukoon determines Muthaqqal or Mukhaffaf."
            },
            {
                "id": "madd_laazim_mc_1",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "How many counts is Madd Laazim (Compulsory Prolongation) read?",
                "choicesList": [
                    "Two counts",
                    "Four counts",
                    "Six counts",
                    "Eight counts"
                ],
                "ans": "Six counts",
                "explanation": "Madd Laazim is fixed at six counts in Hafs from Asim."
            },
            {
                "id": "madd_laazim_mc_2",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "What causes Madd Laazim (Compulsory Prolongation)?",
                "choicesList": [
                    "Temporary Sukoon",
                    "Original Sukoon",
                    "Fathah",
                    "Kasrah"
                ],
                "ans": "Original Sukoon",
                "explanation": "Madd Laazim occurs when an original Sukoon follows a Madd letter."
            },
            {
                "id": "madd_laazim_mc_3",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which statement about the Sukoon of Madd Laazim is correct?",
                "choicesList": [
                    "It is temporary",
                    "It exists only when stopping",
                    "It is permanent",
                    "It appears only at the end of a verse"
                ],
                "ans": "It is permanent",
                "explanation": "The Sukoon is part of the original structure and remains during continuation and stopping."
            },
            {
                "id": "madd_laazim_mc_4",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "How is Madd Laazim divided?",
                "choicesList": [
                    "Natural and secondary",
                    "Heavy and light only",
                    "Word-based and letter-based",
                    "Short and long only"
                ],
                "ans": "Word-based and letter-based",
                "explanation": "Madd Laazim is divided into Kalimi (Word-Based) and Harfi (Letter-Based)."
            },
            {
                "id": "madd_laazim_mc_5",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "What does Kalimi (Word-Based) mean in Madd Laazim?",
                "choicesList": [
                    "It occurs in a word",
                    "It occurs only at the end of a chapter",
                    "It occurs in a letter name",
                    "It occurs only when stopping"
                ],
                "ans": "It occurs in a word",
                "explanation": "Kalimi refers to Madd Laazim occurring within a word."
            },
            {
                "id": "madd_laazim_mc_6",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "What does Harfi (Letter-Based) mean in Madd Laazim?",
                "choicesList": [
                    "It occurs in an ordinary word",
                    "It occurs in the name of an opening letter",
                    "It occurs only before Hamzah",
                    "It occurs only during stopping"
                ],
                "ans": "It occurs in the name of an opening letter",
                "explanation": "Harfi Madd Laazim occurs in specific opening letter names."
            },
            {
                "id": "madd_laazim_mc_7",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which two types belong to Madd Laazim Kalimi (Word-Based Compulsory Prolongation)?",
                "choicesList": [
                    "Sughra and Kubra",
                    "Muthaqqal and Mukhaffaf",
                    "Muttasil and Munfasil",
                    "Badal and Leen"
                ],
                "ans": "Muthaqqal and Mukhaffaf",
                "explanation": "Word-based Madd Laazim is divided into Muthaqqal and Mukhaffaf."
            },
            {
                "id": "madd_laazim_mc_8",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which two types belong to Madd Laazim Harfi (Letter-Based Compulsory Prolongation)?",
                "choicesList": [
                    "Muthaqqal and Mukhaffaf",
                    "Sughra and Kubra",
                    "Muttasil and Munfasil",
                    "Tabee'ee and Badal"
                ],
                "ans": "Muthaqqal and Mukhaffaf",
                "explanation": "Letter-based Madd Laazim has the same heavy/light classification."
            },
            {
                "id": "madd_laazim_mc_9",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "What does Muthaqqal (Heavy) indicate in Madd Laazim?",
                "choicesList": [
                    "Permanent Sukoon associated with Idgham",
                    "Temporary Sukoon from stopping",
                    "No Sukoon",
                    "Hamzah before Madd"
                ],
                "ans": "Permanent Sukoon associated with Idgham",
                "explanation": "Muthaqqal is characterized by a permanent Sukoon connected with merging."
            },
            {
                "id": "madd_laazim_mc_10",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "What does Mukhaffaf (Light) indicate in Madd Laazim?",
                "choicesList": [
                    "Permanent Sukoon without Idgham",
                    "Permanent Sukoon with Idgham",
                    "Temporary Sukoon",
                    "Hamzah after Madd"
                ],
                "ans": "Permanent Sukoon without Idgham",
                "explanation": "Mukhaffaf has the permanent Sukoon without the merging feature of Muthaqqal."
            },
            {
                "id": "madd_laazim_mc_11",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which is a correct full type of Madd Laazim?",
                "choicesList": [
                    "Madd Laazim Kalimi Muthaqqal (Heavy Word-Based Compulsory Prolongation)",
                    "Madd Laazim Natural",
                    "Madd Laazim Muttasil",
                    "Madd Laazim Leen"
                ],
                "ans": "Madd Laazim Kalimi Muthaqqal (Heavy Word-Based Compulsory Prolongation)",
                "explanation": "Kalimi Muthaqqal is one of the four recognized types of Madd Laazim."
            },
            {
                "id": "madd_laazim_mc_12",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which type is word-based and light?",
                "choicesList": [
                    "Madd Laazim Harfi Muthaqqal",
                    "Madd Laazim Kalimi Mukhaffaf (Light Word-Based Compulsory Prolongation)",
                    "Madd Laazim Harfi Mukhaffaf",
                    "Madd Tabee'ee"
                ],
                "ans": "Madd Laazim Kalimi Mukhaffaf (Light Word-Based Compulsory Prolongation)",
                "explanation": "Kalimi means word-based and Mukhaffaf means light."
            },
            {
                "id": "madd_laazim_mc_13",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which type is letter-based and heavy?",
                "choicesList": [
                    "Madd Laazim Kalimi Mukhaffaf",
                    "Madd Laazim Kalimi Muthaqqal",
                    "Madd Laazim Harfi Muthaqqal (Heavy Letter-Based Compulsory Prolongation)",
                    "Madd Laazim Natural"
                ],
                "ans": "Madd Laazim Harfi Muthaqqal (Heavy Letter-Based Compulsory Prolongation)",
                "explanation": "Harfi means letter-based and Muthaqqal means heavy."
            },
            {
                "id": "madd_laazim_mc_14",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which type is letter-based and light?",
                "choicesList": [
                    "Madd Laazim Harfi Mukhaffaf (Light Letter-Based Compulsory Prolongation)",
                    "Madd Laazim Kalimi Muthaqqal",
                    "Madd Muttasil",
                    "Madd Badal"
                ],
                "ans": "Madd Laazim Harfi Mukhaffaf (Light Letter-Based Compulsory Prolongation)",
                "explanation": "Harfi means letter-based and Mukhaffaf means light."
            },
            {
                "id": "madd_laazim_mc_15",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which type is word-based and heavy?",
                "choicesList": [
                    "Madd Laazim Harfi Mukhaffaf",
                    "Madd Laazim Kalimi Muthaqqal (Heavy Word-Based Compulsory Prolongation)",
                    "Madd Laazim Harfi Muthaqqal",
                    "Madd Leen"
                ],
                "ans": "Madd Laazim Kalimi Muthaqqal (Heavy Word-Based Compulsory Prolongation)",
                "explanation": "Kalimi identifies the word-based category and Muthaqqal identifies the heavy type."
            },
            {
                "id": "madd_laazim_mc_16",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which type is word-based and light?",
                "choicesList": [
                    "Madd Laazim Kalimi Mukhaffaf (Light Word-Based Compulsory Prolongation)",
                    "Madd Laazim Harfi Muthaqqal",
                    "Madd Laazim Harfi Mukhaffaf",
                    "Madd 'Aarid Li-Sukoon"
                ],
                "ans": "Madd Laazim Kalimi Mukhaffaf (Light Word-Based Compulsory Prolongation)",
                "explanation": "Kalimi means word-based and Mukhaffaf means light."
            },
            {
                "id": "madd_laazim_mc_17",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which type is found in specific opening letter names?",
                "choicesList": [
                    "Madd Laazim Kalimi",
                    "Madd Laazim Harfi",
                    "Madd Badal",
                    "Madd Muttasil"
                ],
                "ans": "Madd Laazim Harfi",
                "explanation": "Harfi Madd Laazim occurs in specific opening letter names."
            },
            {
                "id": "madd_laazim_mc_18",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which type occurs within a normal word?",
                "choicesList": [
                    "Madd Laazim Harfi",
                    "Madd Laazim Kalimi",
                    "Madd Leen",
                    "Madd Silah"
                ],
                "ans": "Madd Laazim Kalimi",
                "explanation": "Kalimi refers to the occurrence of Madd Laazim within a word."
            },
            {
                "id": "madd_laazim_mc_19",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "What distinguishes Muthaqqal (Heavy) from Mukhaffaf (Light)?",
                "choicesList": [
                    "The presence or absence of a permanent Sukoon",
                    "Whether the permanent Sukoon is associated with Idgham",
                    "Whether the reciter stops",
                    "Whether the Madd letter is Alif"
                ],
                "ans": "Whether the permanent Sukoon is associated with Idgham",
                "explanation": "Muthaqqal has the merging feature, while Mukhaffaf does not."
            },
            {
                "id": "madd_laazim_mc_20",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "What distinguishes Kalimi (Word-Based) from Harfi (Letter-Based)?",
                "choicesList": [
                    "The number of counts",
                    "Whether the Madd occurs in a word or a letter name",
                    "The type of vowel before Madd",
                    "Whether the reciter stops"
                ],
                "ans": "Whether the Madd occurs in a word or a letter name",
                "explanation": "Kalimi occurs in words, while Harfi occurs in specific letter names."
            },
            {
                "id": "madd_laazim_mc_21",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which statement about Madd Laazim is correct?",
                "choicesList": [
                    "It is always two counts",
                    "It is always four counts",
                    "It is always six counts",
                    "Its length depends on stopping"
                ],
                "ans": "It is always six counts",
                "explanation": "Madd Laazim has a fixed six-count length in Hafs from Asim."
            },
            {
                "id": "madd_laazim_mc_22",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which Madd has a temporary Sukoon rather than an original Sukoon?",
                "choicesList": [
                    "Madd Laazim (Compulsory Prolongation)",
                    "Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon)",
                    "Madd Badal (Substitute Prolongation)",
                    "Madd Tabee'ee (Natural Prolongation)"
                ],
                "ans": "Madd 'Aarid Li-Sukoon (Temporary Prolongation Due to Sukoon)",
                "explanation": "Madd 'Aarid Li-Sukoon results from the temporary Sukoon created by stopping."
            },
            {
                "id": "madd_laazim_mc_23",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which statement correctly describes Madd Laazim Kalimi Muthaqqal?",
                "choicesList": [
                    "Word-based, permanent Sukoon, with Idgham",
                    "Word-based, temporary Sukoon, without Idgham",
                    "Letter-based, permanent Sukoon, without Idgham",
                    "Letter-based, temporary Sukoon, with Idgham"
                ],
                "ans": "Word-based, permanent Sukoon, with Idgham",
                "explanation": "These three features define Kalimi Muthaqqal."
            },
            {
                "id": "madd_laazim_mc_24",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which statement correctly describes Madd Laazim Kalimi Mukhaffaf?",
                "choicesList": [
                    "Word-based, permanent Sukoon, without Idgham",
                    "Word-based, temporary Sukoon, with Idgham",
                    "Letter-based, permanent Sukoon, with Idgham",
                    "Letter-based, temporary Sukoon, without Idgham"
                ],
                "ans": "Word-based, permanent Sukoon, without Idgham",
                "explanation": "These features define Kalimi Mukhaffaf."
            },
            {
                "id": "madd_laazim_mc_25",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which statement correctly describes Madd Laazim Harfi Muthaqqal?",
                "choicesList": [
                    "Letter-based, permanent Sukoon, with Idgham",
                    "Word-based, temporary Sukoon, without Idgham",
                    "Letter-based, temporary Sukoon, with Idgham",
                    "Word-based, permanent Sukoon, without Idgham"
                ],
                "ans": "Letter-based, permanent Sukoon, with Idgham",
                "explanation": "These features define Harfi Muthaqqal."
            },
            {
                "id": "madd_laazim_mc_26",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which statement correctly describes Madd Laazim Harfi Mukhaffaf?",
                "choicesList": [
                    "Letter-based, permanent Sukoon, without Idgham",
                    "Word-based, permanent Sukoon, with Idgham",
                    "Letter-based, temporary Sukoon, without Idgham",
                    "Word-based, temporary Sukoon, with Idgham"
                ],
                "ans": "Letter-based, permanent Sukoon, without Idgham",
                "explanation": "These features define Harfi Mukhaffaf."
            },
            {
                "id": "madd_laazim_mc_27",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which of the following is NOT one of the four types of Madd Laazim?",
                "choicesList": [
                    "Kalimi Muthaqqal",
                    "Kalimi Mukhaffaf",
                    "Harfi Muthaqqal",
                    "Munfasil"
                ],
                "ans": "Munfasil",
                "explanation": "Munfasil belongs to Madd Munfasil (Separated Prolongation), not Madd Laazim."
            },
            {
                "id": "madd_laazim_mc_28",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which term means \"word-based\"?",
                "choicesList": [
                    "Harfi",
                    "Kalimi",
                    "Muthaqqal",
                    "Mukhaffaf"
                ],
                "ans": "Kalimi",
                "explanation": "Kalimi means word-based."
            },
            {
                "id": "madd_laazim_mc_29",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which term means \"letter-based\"?",
                "choicesList": [
                    "Kalimi",
                    "Muthaqqal",
                    "Harfi",
                    "Mukhaffaf"
                ],
                "ans": "Harfi",
                "explanation": "Harfi means letter-based."
            },
            {
                "id": "madd_laazim_mc_30",
                "isTheory": true,
                "categoryId": "madd_laazim",
                "categoryTitle": "Madd Laazim (Compulsory Prolongation)",
                "type": "mc",
                "prompt": "Which statement gives the complete classification of Madd Laazim?",
                "choicesList": [
                    "It is divided into Kalimi and Harfi, and each has Muthaqqal and Mukhaffaf",
                    "It is divided only into two-count and six-count types",
                    "It is divided into Muttasil and Munfasil only",
                    "It has no subtypes"
                ],
                "ans": "It is divided into Kalimi and Harfi, and each has Muthaqqal and Mukhaffaf",
                "explanation": "These four combinations make up the complete classification of Madd Laazim."
            }
        ]
    },
    "tafkheem_tarqeeq": {
        "id": "tafkheem_tarqeeq",
        "title": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
        "icon": "⚖️",
        "description": "Permanent heavy letters (Khas Dagt Qiz), temporary letters (Raa, Alif, Laam of Allah)",
        "questions": [
            {
                "id": "tafkheem_tarqeeq_tf_1",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Tafkheem (Heaviness) means pronouncing a letter with a heavy or full sound.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Tafkheem gives the letter a fuller and heavier sound."
            },
            {
                "id": "tafkheem_tarqeeq_tf_2",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Tarqeeq (Lightness) means pronouncing a letter with a light sound.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Tarqeeq gives the letter a lighter and thinner sound."
            },
            {
                "id": "tafkheem_tarqeeq_tf_3",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "There are seven letters that are always characterized by Tafkheem (Heaviness).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The seven permanent heavy letters are Khaa, Saad, Daad, Ghayn, Taa, Qaf, and Zaa."
            },
            {
                "id": "tafkheem_tarqeeq_tf_4",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "The seven heavy letters are always pronounced with Tarqeeq (Lightness).",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "These seven letters are always pronounced with Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_tf_5",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Khaa is one of the seven permanently heavy letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Khaa belongs to the seven letters of Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_tf_6",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Saad is one of the seven permanently heavy letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Saad is one of the letters that always has Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_tf_7",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Daad is one of the seven permanently heavy letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Daad is one of the seven heavy letters."
            },
            {
                "id": "tafkheem_tarqeeq_tf_8",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Ghayn is one of the seven permanently heavy letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Ghayn is always pronounced with Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_tf_9",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Taa is one of the seven permanently heavy letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Taa belongs to the seven heavy letters."
            },
            {
                "id": "tafkheem_tarqeeq_tf_10",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Qaf is one of the seven permanently heavy letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Qaf is always pronounced with Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_tf_11",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Zaa is one of the seven permanently heavy letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Zaa is one of the seven permanently heavy letters."
            },
            {
                "id": "tafkheem_tarqeeq_tf_12",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Raa is always heavy in every situation.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Raa can be heavy or light depending on its vowel and surrounding conditions."
            },
            {
                "id": "tafkheem_tarqeeq_tf_13",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Raa with Fathah is pronounced heavily.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "A Raa with Fathah has Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_tf_14",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Raa with Dammah is pronounced heavily.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "A Raa with Dammah has Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_tf_15",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Raa with Kasrah is normally pronounced lightly.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "A Raa with Kasrah normally has Tarqeeq."
            },
            {
                "id": "tafkheem_tarqeeq_tf_16",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "A Raa with original Sukoon after Fathah is pronounced lightly.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "A Raa with original Sukoon after Fathah is pronounced heavily."
            },
            {
                "id": "tafkheem_tarqeeq_tf_17",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "A Raa with original Sukoon after Dammah is pronounced heavily.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The preceding Dammah causes the Raa to be heavy."
            },
            {
                "id": "tafkheem_tarqeeq_tf_18",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "A Raa with original Sukoon after original Kasrah is normally pronounced lightly.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "An original Kasrah before a Raa with Sukoon normally causes Tarqeeq."
            },
            {
                "id": "tafkheem_tarqeeq_tf_19",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "The vowel before a Raa with Sukoon can affect whether the Raa is heavy or light.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The preceding vowel is important in determining the pronunciation of a Raa with Sukoon."
            },
            {
                "id": "tafkheem_tarqeeq_tf_20",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "tf",
                "prompt": "Laam in the Name of Allah is always heavy.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "The Laam of Allah can be heavy or light depending on the vowel before it."
            },
            {
                "id": "tafkheem_tarqeeq_mc_1",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "What does Tafkheem (Heaviness) mean?",
                "choicesList": [
                    "Pronouncing a letter heavily",
                    "Pronouncing a letter lightly",
                    "Hiding a letter",
                    "Prolonging a letter"
                ],
                "ans": "Pronouncing a letter heavily",
                "explanation": "Tafkheem gives the letter a full and heavy sound."
            },
            {
                "id": "tafkheem_tarqeeq_mc_2",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "What does Tarqeeq (Lightness) mean?",
                "choicesList": [
                    "Pronouncing a letter heavily",
                    "Pronouncing a letter lightly",
                    "Merging two letters",
                    "Echoing a letter"
                ],
                "ans": "Pronouncing a letter lightly",
                "explanation": "Tarqeeq gives the letter a light and thin sound."
            },
            {
                "id": "tafkheem_tarqeeq_mc_3",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "How many letters are permanently heavy?",
                "choicesList": [
                    "Five",
                    "Six",
                    "Seven",
                    "Eight"
                ],
                "ans": "Seven",
                "explanation": "Seven letters always have Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_mc_4",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which of the following is a permanently heavy letter?",
                "choicesList": [
                    "Khaa",
                    "Baa",
                    "Meem",
                    "Noon"
                ],
                "ans": "Khaa",
                "explanation": "Khaa is one of the seven permanently heavy letters."
            },
            {
                "id": "tafkheem_tarqeeq_mc_5",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which of the following is a permanently heavy letter?",
                "choicesList": [
                    "Seen",
                    "Saad",
                    "Meem",
                    "Laam"
                ],
                "ans": "Saad",
                "explanation": "Saad always has Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_mc_6",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which of the following is a permanently heavy letter?",
                "choicesList": [
                    "Daad",
                    "Taa",
                    "Baa",
                    "Noon"
                ],
                "ans": "Daad",
                "explanation": "Daad is one of the seven heavy letters."
            },
            {
                "id": "tafkheem_tarqeeq_mc_7",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which of the following is a permanently heavy letter?",
                "choicesList": [
                    "Ghayn",
                    "Haa",
                    "Yaa",
                    "Meem"
                ],
                "ans": "Ghayn",
                "explanation": "Ghayn is always pronounced with Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_mc_8",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which of the following is a permanently heavy letter?",
                "choicesList": [
                    "Taa",
                    "Daal",
                    "Raa",
                    "Laam"
                ],
                "ans": "Taa",
                "explanation": "Taa belongs to the seven permanently heavy letters."
            },
            {
                "id": "tafkheem_tarqeeq_mc_9",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which of the following is a permanently heavy letter?",
                "choicesList": [
                    "Qaf",
                    "Kaaf",
                    "Noon",
                    "Faa"
                ],
                "ans": "Qaf",
                "explanation": "Qaf always has Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_mc_10",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which of the following is a permanently heavy letter?",
                "choicesList": [
                    "Zaa",
                    "Zaal",
                    "Dhaal",
                    "Daal"
                ],
                "ans": "Zaa",
                "explanation": "Zaa is one of the seven permanently heavy letters."
            },
            {
                "id": "tafkheem_tarqeeq_mc_11",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which list contains only permanently heavy letters?",
                "choicesList": [
                    "Khaa, Saad, Daad, Ghayn",
                    "Baa, Meem, Noon, Yaa",
                    "Seen, Sheen, Faa, Taa",
                    "Kaaf, Taa, Laam, Raa"
                ],
                "ans": "Khaa, Saad, Daad, Ghayn",
                "explanation": "All four letters in this option belong to the seven heavy letters."
            },
            {
                "id": "tafkheem_tarqeeq_mc_12",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which list contains all seven permanently heavy letters?",
                "choicesList": [
                    "Khaa, Saad, Daad, Ghayn, Taa, Qaf, Zaa",
                    "Khaa, Seen, Daad, Ghayn, Taa, Qaf, Zaa",
                    "Khaa, Saad, Daal, Ghayn, Taa, Qaf, Zaa",
                    "Khaa, Saad, Daad, Haa, Taa, Qaf, Zaa"
                ],
                "ans": "Khaa, Saad, Daad, Ghayn, Taa, Qaf, Zaa",
                "explanation": "These are the seven permanently heavy letters."
            },
            {
                "id": "tafkheem_tarqeeq_mc_13",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which Raa is normally heavy?",
                "choicesList": [
                    "Raa with Fathah",
                    "Raa with Kasrah",
                    "Raa with original Sukoon after Kasrah",
                    "Every Raa with Kasrah"
                ],
                "ans": "Raa with Fathah",
                "explanation": "Raa with Fathah is pronounced with Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_mc_14",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which Raa is normally heavy?",
                "choicesList": [
                    "Raa with Dammah",
                    "Raa with Kasrah",
                    "Raa with original Sukoon after original Kasrah",
                    "Every light Raa"
                ],
                "ans": "Raa with Dammah",
                "explanation": "Raa with Dammah is pronounced heavily."
            },
            {
                "id": "tafkheem_tarqeeq_mc_15",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which Raa is normally light?",
                "choicesList": [
                    "Raa with Fathah",
                    "Raa with Dammah",
                    "Raa with Kasrah",
                    "Raa after Dammah"
                ],
                "ans": "Raa with Kasrah",
                "explanation": "Raa with Kasrah normally has Tarqeeq."
            },
            {
                "id": "tafkheem_tarqeeq_mc_16",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "A Raa with original Sukoon comes after Fathah. How is the Raa normally pronounced?",
                "choicesList": [
                    "Heavy Raa",
                    "Light Raa",
                    "Hidden Raa",
                    "Merged Raa"
                ],
                "ans": "Heavy Raa",
                "explanation": "Fathah before a Raa with original Sukoon causes Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_mc_17",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "A Raa with original Sukoon comes after Dammah. How is the Raa pronounced?",
                "choicesList": [
                    "Light Raa",
                    "Heavy Raa",
                    "Hidden Raa",
                    "Merged Raa"
                ],
                "ans": "Heavy Raa",
                "explanation": "Dammah before a Raa with Sukoon causes Tafkheem."
            },
            {
                "id": "tafkheem_tarqeeq_mc_18",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "A Raa with original Sukoon comes after original Kasrah. How is the Raa normally pronounced?",
                "choicesList": [
                    "Heavy Raa",
                    "Light Raa",
                    "Always doubled",
                    "Always silent"
                ],
                "ans": "Light Raa",
                "explanation": "An original Kasrah before a Raa with Sukoon normally causes Tarqeeq."
            },
            {
                "id": "tafkheem_tarqeeq_mc_19",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Which factor can determine the heaviness or lightness of a Raa with Sukoon?",
                "choicesList": [
                    "The preceding vowel",
                    "The number of words",
                    "The number of verses",
                    "The reading speed"
                ],
                "ans": "The preceding vowel",
                "explanation": "The vowel immediately before the Raa can determine its quality."
            },
            {
                "id": "tafkheem_tarqeeq_mc_20",
                "isTheory": true,
                "categoryId": "tafkheem_tarqeeq",
                "categoryTitle": "Tafkheem & Tarqeeq (Heaviness & Lightness)",
                "type": "mc",
                "prompt": "Is Raa always heavy?",
                "choicesList": [
                    "Yes, always",
                    "No, it can be heavy or light",
                    "Yes, except in Madd",
                    "No, it is always light"
                ],
                "ans": "No, it can be heavy or light",
                "explanation": "Raa has both Tafkheem and Tarqeeq depending on its conditions."
            }
        ]
    },
    "letter_relationships": {
        "id": "letter_relationships",
        "title": "Letter Relationships",
        "icon": "🤝",
        "description": "Mutamathilayn (Identical), Mutajanisayn (Homogeneous), Mutaqaribayn (Close), and Mutaba'idayn (Distant)",
        "questions": [
            {
                "id": "letter_relationships_tf_1",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "tf",
                "prompt": "Mutamathilayn (Identical Letters) means that two letters are identical in their articulation point and characteristics.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Mutamathilayn occurs when two identical letters meet."
            },
            {
                "id": "letter_relationships_tf_2",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "tf",
                "prompt": "Mutajanisayn (Homogeneous Letters) refers to letters that share the same articulation point but differ in some characteristics.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Homogeneous letters come from the same articulation area but are not identical in characteristics."
            },
            {
                "id": "letter_relationships_tf_3",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "tf",
                "prompt": "Mutaqaribayn (Close Letters) refers to letters that are close in articulation point or characteristics.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Mutaqaribayn describes letters that are close to each other."
            },
            {
                "id": "letter_relationships_tf_4",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "tf",
                "prompt": "Mutaba'idayn (Distant Letters) refers to letters that are close in articulation point.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Mutaba'idayn refers to letters that are distant from each other in articulation or characteristics."
            },
            {
                "id": "letter_relationships_tf_5",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "tf",
                "prompt": "Two identical letters meeting can form a Mutamathilayn relationship.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Identical letters are the basis of Mutamathilayn."
            },
            {
                "id": "letter_relationships_tf_6",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "tf",
                "prompt": "Mutajanisayn requires two completely identical letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Mutajanisayn involves letters with the same articulation point but different characteristics."
            },
            {
                "id": "letter_relationships_tf_7",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "tf",
                "prompt": "Mutaqaribayn means two letters are completely identical.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Mutaqaribayn means the letters are close, not identical."
            },
            {
                "id": "letter_relationships_tf_8",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "tf",
                "prompt": "Mutaba'idayn means the two letters are far apart.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The term describes a distant relationship between the letters."
            },
            {
                "id": "letter_relationships_tf_9",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "tf",
                "prompt": "Letter relationships are based on the relationship between two consecutive letters.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The relationship is determined by examining the two letters that meet."
            },
            {
                "id": "letter_relationships_tf_10",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "tf",
                "prompt": "Mutamathilayn is also described as an identical-letter relationship.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The two letters share the same articulation and characteristics."
            },
            {
                "id": "letter_relationships_mc_1",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "mc",
                "prompt": "What does Mutamathilayn (Identical Letters) mean?",
                "choicesList": [
                    "Two distant letters",
                    "Two identical letters",
                    "Two weak letters",
                    "Two heavy letters"
                ],
                "ans": "Two identical letters",
                "explanation": "Mutamathilayn describes two letters that are identical in articulation and characteristics."
            },
            {
                "id": "letter_relationships_mc_2",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "mc",
                "prompt": "What does Mutajanisayn (Homogeneous Letters) mean?",
                "choicesList": [
                    "Letters with the same articulation point but different characteristics",
                    "Completely identical letters",
                    "Completely distant letters",
                    "Letters with different vowels only"
                ],
                "ans": "Letters with the same articulation point but different characteristics",
                "explanation": "Mutajanisayn letters share an articulation point but differ in some characteristics."
            },
            {
                "id": "letter_relationships_mc_3",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "mc",
                "prompt": "What does Mutaqaribayn (Close Letters) mean?",
                "choicesList": [
                    "Identical letters",
                    "Distant letters",
                    "Close letters",
                    "Heavy letters"
                ],
                "ans": "Close letters",
                "explanation": "Mutaqaribayn describes letters that are close in articulation or characteristics."
            },
            {
                "id": "letter_relationships_mc_4",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "mc",
                "prompt": "What does Mutaba'idayn (Distant Letters) mean?",
                "choicesList": [
                    "Identical letters",
                    "Homogeneous letters",
                    "Close letters",
                    "Distant letters"
                ],
                "ans": "Distant letters",
                "explanation": "Mutaba'idayn describes letters that are distant from each other."
            },
            {
                "id": "letter_relationships_mc_5",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "mc",
                "prompt": "Which relationship involves two identical letters?",
                "choicesList": [
                    "Mutamathilayn",
                    "Mutajanisayn",
                    "Mutaqaribayn",
                    "Mutaba'idayn"
                ],
                "ans": "Mutamathilayn",
                "explanation": "Mutamathilayn is the relationship between identical letters."
            },
            {
                "id": "letter_relationships_mc_6",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "mc",
                "prompt": "Which relationship involves the same articulation point but different characteristics?",
                "choicesList": [
                    "Mutaba'idayn",
                    "Mutajanisayn",
                    "Mutaqaribayn",
                    "Mutamathilayn"
                ],
                "ans": "Mutajanisayn",
                "explanation": "Homogeneous letters share their articulation point but differ in characteristics."
            },
            {
                "id": "letter_relationships_mc_7",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "mc",
                "prompt": "Which relationship describes letters that are close to each other?",
                "choicesList": [
                    "Mutamathilayn",
                    "Mutaba'idayn",
                    "Mutaqaribayn",
                    "Mutajanisayn"
                ],
                "ans": "Mutaqaribayn",
                "explanation": "Mutaqaribayn means close letters."
            },
            {
                "id": "letter_relationships_mc_8",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "mc",
                "prompt": "Which relationship describes letters that are far apart?",
                "choicesList": [
                    "Mutaba'idayn",
                    "Mutamathilayn",
                    "Mutajanisayn",
                    "Mutaqaribayn"
                ],
                "ans": "Mutaba'idayn",
                "explanation": "Mutaba'idayn means distant letters."
            },
            {
                "id": "letter_relationships_mc_9",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "mc",
                "prompt": "What is the main idea behind Mutamathilayn?",
                "choicesList": [
                    "Distance",
                    "Identity",
                    "Weakness",
                    "Heaviness"
                ],
                "ans": "Identity",
                "explanation": "The two letters are identical in articulation and characteristics."
            },
            {
                "id": "letter_relationships_mc_10",
                "isTheory": true,
                "categoryId": "letter_relationships",
                "categoryTitle": "Letter Relationships",
                "type": "mc",
                "prompt": "What is the main idea behind Mutajanisayn?",
                "choicesList": [
                    "Homogeneity",
                    "Distance",
                    "Length",
                    "Heaviness"
                ],
                "ans": "Homogeneity",
                "explanation": "The letters share the same articulation point but differ in characteristics."
            }
        ]
    },
    "hamzat_al_wasl": {
        "id": "hamzat_al_wasl",
        "title": "Hamzat Al-Wasl",
        "icon": "📍",
        "description": "Pronunciation rules when starting vs connecting, nouns, verbs, and the definite article",
        "questions": [
            {
                "id": "hamzat_al_wasl_tf_1",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "Hamzat Al-Wasl is used to help the reader begin a word when the word starts with a consonant sound.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Hamzat Al-Wasl provides a starting vowel sound when needed."
            },
            {
                "id": "hamzat_al_wasl_tf_2",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "Hamzat Al-Wasl is always pronounced when connecting from the previous word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Hamzat Al-Wasl is dropped in pronunciation when connecting from the previous word."
            },
            {
                "id": "hamzat_al_wasl_tf_3",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "Hamzat Al-Wasl is pronounced when starting directly from the word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "It is pronounced when beginning with the word."
            },
            {
                "id": "hamzat_al_wasl_tf_4",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "Hamzat Al-Wasl is dropped when continuing from the previous word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The connecting pronunciation moves directly into the word without pronouncing the Hamzat Al-Wasl."
            },
            {
                "id": "hamzat_al_wasl_tf_5",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "Hamzat Al-Wasl can have a Fathah when beginning certain words.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Some words begin with Hamzat Al-Wasl pronounced with Fathah."
            },
            {
                "id": "hamzat_al_wasl_tf_6",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "Hamzat Al-Wasl can have a Kasrah when beginning certain words.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Kasrah is used with Hamzat Al-Wasl in many common cases."
            },
            {
                "id": "hamzat_al_wasl_tf_7",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "Hamzat Al-Wasl can have a Dammah when beginning certain words.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Some words begin with Hamzat Al-Wasl pronounced with Dammah."
            },
            {
                "id": "hamzat_al_wasl_tf_8",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "Hamzat Al-Wasl always begins with the same vowel sound.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Its starting vowel can be Fathah, Kasrah, or Dammah depending on the word."
            },
            {
                "id": "hamzat_al_wasl_tf_9",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "When starting a word with Hamzat Al-Wasl, the correct starting vowel must be known.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "The correct vowel determines how the word should be started."
            },
            {
                "id": "hamzat_al_wasl_tf_10",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "When connecting to a word beginning with Hamzat Al-Wasl, the Hamzat Al-Wasl remains clearly pronounced.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "It is dropped during connected reading."
            },
            {
                "id": "hamzat_al_wasl_tf_11",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "The purpose of Hamzat Al-Wasl is related to beginning pronunciation.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "It allows a word that cannot normally begin with its first consonant cluster to be started correctly."
            },
            {
                "id": "hamzat_al_wasl_tf_12",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "Hamzat Al-Wasl and Hamzat Al-Qat' behave exactly the same when connecting.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "Hamzat Al-Qat' remains pronounced, while Hamzat Al-Wasl is dropped in connected reading."
            },
            {
                "id": "hamzat_al_wasl_tf_13",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "A reader may pronounce Hamzat Al-Wasl when stopping before the word and then starting it.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Starting the word requires the appropriate Hamzat Al-Wasl pronunciation."
            },
            {
                "id": "hamzat_al_wasl_tf_14",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "A reader may drop Hamzat Al-Wasl when starting directly from the word.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "False",
                "explanation": "It must be pronounced when beginning directly from the word."
            },
            {
                "id": "hamzat_al_wasl_tf_15",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "tf",
                "prompt": "The vowel used when starting with Hamzat Al-Wasl depends on the type of word and its structure.",
                "choicesList": [
                    "True",
                    "False"
                ],
                "ans": "True",
                "explanation": "Different word patterns require different starting vowels."
            },
            {
                "id": "hamzat_al_wasl_mc_1",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "What is the main purpose of Hamzat Al-Wasl?",
                "choicesList": [
                    "To lengthen a vowel",
                    "To help begin a word",
                    "To make a letter heavy",
                    "To create Qalqalah"
                ],
                "ans": "To help begin a word",
                "explanation": "Hamzat Al-Wasl provides the starting sound needed to begin certain words."
            },
            {
                "id": "hamzat_al_wasl_mc_2",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "What happens to Hamzat Al-Wasl when connecting from the previous word?",
                "choicesList": [
                    "It is lengthened",
                    "It becomes heavy",
                    "It is dropped",
                    "It becomes doubled"
                ],
                "ans": "It is dropped",
                "explanation": "Hamzat Al-Wasl is not pronounced during connected reading."
            },
            {
                "id": "hamzat_al_wasl_mc_3",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "What happens to Hamzat Al-Wasl when starting directly from the word?",
                "choicesList": [
                    "It is pronounced",
                    "It is deleted completely",
                    "It becomes silent",
                    "It is always pronounced with Fathah"
                ],
                "ans": "It is pronounced",
                "explanation": "It must be pronounced when beginning directly from the word."
            },
            {
                "id": "hamzat_al_wasl_mc_4",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "Which vowels can be used when starting with Hamzat Al-Wasl?",
                "choicesList": [
                    "Fathah only",
                    "Kasrah only",
                    "Dammah only",
                    "Fathah, Kasrah, or Dammah"
                ],
                "ans": "Fathah, Kasrah, or Dammah",
                "explanation": "The starting vowel depends on the word and its grammatical or morphological pattern."
            },
            {
                "id": "hamzat_al_wasl_mc_5",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "Which vowel commonly begins the definite article through Hamzat Al-Wasl?",
                "choicesList": [
                    "Fathah",
                    "Kasrah",
                    "Dammah",
                    "Sukoon"
                ],
                "ans": "Fathah",
                "explanation": "The definite article (Al-) always begins with Fathah when starting."
            },
            {
                "id": "hamzat_al_wasl_mc_6",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "What happens to the Hamzat Al-Wasl of the definite article during connected reading?",
                "choicesList": [
                    "It is pronounced",
                    "It is doubled",
                    "It is dropped",
                    "It becomes Dammah"
                ],
                "ans": "It is dropped",
                "explanation": "Connected reading moves directly from the previous word into the article."
            },
            {
                "id": "hamzat_al_wasl_mc_7",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "Which type of word can contain Hamzat Al-Wasl?",
                "choicesList": [
                    "Certain nouns",
                    "Certain verbs",
                    "The definite article",
                    "All of the above"
                ],
                "ans": "All of the above",
                "explanation": "Hamzat Al-Wasl occurs in specific nouns, verbs, and the definite article."
            },
            {
                "id": "hamzat_al_wasl_mc_8",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "Many nouns beginning with Hamzat Al-Wasl are started with which vowel?",
                "choicesList": [
                    "Fathah",
                    "Kasrah",
                    "Dammah",
                    "Sukoon"
                ],
                "ans": "Kasrah",
                "explanation": "Kasrah is the normal starting vowel for many of these nouns."
            },
            {
                "id": "hamzat_al_wasl_mc_9",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "Five-letter verbs generally begin Hamzat Al-Wasl with which vowel?",
                "choicesList": [
                    "Fathah",
                    "Kasrah",
                    "Dammah",
                    "Sukoon"
                ],
                "ans": "Kasrah",
                "explanation": "Five-letter verbs generally use Kasrah when starting from Hamzat Al-Wasl."
            },
            {
                "id": "hamzat_al_wasl_mc_10",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "Six-letter verbs generally begin Hamzat Al-Wasl with which vowel?",
                "choicesList": [
                    "Kasrah",
                    "Fathah",
                    "Dammah",
                    "Sukoon"
                ],
                "ans": "Kasrah",
                "explanation": "Six-letter verbs generally begin with Kasrah at Hamzat Al-Wasl."
            },
            {
                "id": "hamzat_al_wasl_mc_11",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "Which verb category can require special attention to the third root letter when choosing the starting vowel?",
                "choicesList": [
                    "Three-letter imperative",
                    "Five-letter verb",
                    "Six-letter verb",
                    "Definite article"
                ],
                "ans": "Three-letter imperative",
                "explanation": "The third root letter helps determine the starting vowel in three-letter imperatives."
            },
            {
                "id": "hamzat_al_wasl_mc_12",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "If the third root letter of a three-letter imperative has an original Dammah, how is Hamzat Al-Wasl started?",
                "choicesList": [
                    "Fathah",
                    "Kasrah",
                    "Dammah",
                    "Sukoon"
                ],
                "ans": "Dammah",
                "explanation": "An original Dammah on the third root letter causes the starting Hamzat Al-Wasl to take Dammah."
            },
            {
                "id": "hamzat_al_wasl_mc_13",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "In the remaining standard three-letter imperative cases, how is Hamzat Al-Wasl generally started?",
                "choicesList": [
                    "Fathah",
                    "Kasrah",
                    "Dammah",
                    "Sukoon"
                ],
                "ans": "Kasrah",
                "explanation": "Kasrah is generally used when the third root letter does not have an original Dammah."
            },
            {
                "id": "hamzat_al_wasl_mc_14",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "What is the key difference between starting and connecting with Hamzat Al-Wasl?",
                "choicesList": [
                    "It is pronounced when starting and dropped when connecting",
                    "It is dropped when starting and pronounced when connecting",
                    "It is always pronounced",
                    "It is always dropped"
                ],
                "ans": "It is pronounced when starting and dropped when connecting",
                "explanation": "This is the fundamental behavior of Hamzat Al-Wasl."
            },
            {
                "id": "hamzat_al_wasl_mc_15",
                "isTheory": true,
                "categoryId": "hamzat_al_wasl",
                "categoryTitle": "Hamzat Al-Wasl",
                "type": "mc",
                "prompt": "Which term describes reading directly from the beginning of a word?",
                "choicesList": [
                    "Connecting",
                    "Starting",
                    "Merging",
                    "Stopping"
                ],
                "ans": "Starting",
                "explanation": "Starting means beginning the reading directly from that word."
            }
        ]
    }
};
