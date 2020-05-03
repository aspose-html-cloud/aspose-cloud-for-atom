'use babel';
export default {
    "outputDirectory": {
        "title": "Output Directory",
        "type": "string",
        "default": ".",
        "description": "Place for output files"
    },
    "paper.orientation": {
        "title": "Orientation",
        "type": "string",
        "enum": [
            "portrait",
            "landscape"
        ],
        "default": "portrait",
        "description": "Paper orientation for PDF files. Portrait or Landscape."
    },
    "paper.size": {
        "title": "Paper size",
        "type": "string",
        "enum": [
            "A0",
            "A1",
            "A2",
            "A3",
            "A4",
            "A5",
            "A6",
            "Letter",
            "Legal",
            "Custom"
        ],
        "default": "A4",
        "description": "Paper Size [A0, A1, A2, A3, A4, A5, A6, Letter, Legal]. The value Custom means using options Width and Height instead Paper Size."
    },
    "paper.width": {
        "title": "Width",
        "type": "string",
        "default": "210mm",
        "description": "Paper Width, accepts values labeled with units(mm, cm, in, px)."
    },
    "paper.height": {
        "type": "string",
        "default": "297mm",
        "description": "Paper Height, accepts values labeled with units(mm, cm, in, px)."
    },
    "margin.top": {
        "type": "string",
        "default": "10mm",
        "description": "Top margin (units: mm, cm, in, px)."
    },
    "margin.bottom": {
        "type": "string",
        "default": "10mm",
        "description": "Bottom margin (units: mm, cm, in, px)."
    },
    "margin.right": {
        "type": "string",
        "default": "10mm",
        "description": "Right margin (units: mm, cm, in, px)."
    },
    "margin.left": {
        "type": "string",
        "default": "10mm",
        "description": "Left margin (units: mm, cm, in, px)."
    }
}
