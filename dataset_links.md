# AgroBuddy AI - Dataset Download Instructions

Due to GitHub's file size limit (maximum 100 MB per file) and recommended repository size limits, the large dataset required for training and running full diagnostic testing has been excluded from this repository.

## Excluded Dataset Details

- **Filename**: `Crop Disease and Pest Control Dataset.zip`
- **Size**: ~1.33 GB (uncompressed: several gigabytes of image directories)
- **Content**: High-resolution image files of crop leaves showing spots, rusts, blights, and healthy state classifications. Used for testing the diagnostic capabilities of the **Leaf Disease Diagnostic Lab**.

---

## Download Instructions

To run full diagnostics locally or train/evaluate models:

1. **Download the Dataset**:
   You can obtain this dataset or similar crop disease image assets directly from Kaggle:
   - **Kaggle Link**: [Crop Pest and Disease Dataset on Kaggle](https://www.kaggle.com/datasets/khalidghazi/crop-pest-and-disease-dataset)
   - Alternatively, search Kaggle for: `"Crop Pest and Disease"` or `"Crop Disease and Pest Control Dataset"`.

2. **Setup in Project**:
   - Download the zip file from Kaggle.
   - Rename the downloaded file to `Crop Disease and Pest Control Dataset.zip` (if it differs).
   - Place the file in the root folder of this project:
     ```text
     c:\Agrobuddy AI\Crop Disease and Pest Control Dataset.zip
     ```

3. **Extracting (Optional)**:
   If you wish to use the raw images directly in training scripts, extract the contents into a `dataset/` folder within the root.
