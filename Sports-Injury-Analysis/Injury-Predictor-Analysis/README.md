# Injury Predictor

The **Injury Predictor** is a machine learning-based application developed using Streamlit and scikit-learn to predict the likelihood of injuries in athletes based on various input factors. By analyzing key metrics, this tool assists medical professionals and trainers in identifying potential injury risks and making informed decisions to ensure athletes' well-being.

## Project Overview
This application takes user inputs related to workload, recovery, and physical metrics to predict injury risk. The app's interactive features allow users to:
- Adjust input data for various metrics like workload, groin squeeze, hip mobility, and rest period.
- Visualize the data in a radar chart for easy comparison.
- Obtain predictions and probabilities of injury risk.

## Features
- **Data Input Sidebar**: Users can select values for metrics such as game workload, groin squeeze, hip mobility, and rest period.
- **Radar Chart Visualization**: Displays scaled metric values to help in visual data analysis.
- **Injury Prediction**: Uses a trained machine learning model to predict the likelihood of an injury.
- **Probability Display**: Shows the probability of injury occurrence to support better decision-making.

## Technologies Used
- **Python**: Core programming language.
- **Streamlit**: Used to create the interactive web application.
- **Plotly**: Provides visualizations, including radar charts.
- **Scikit-learn**: For machine learning model training and evaluation.
- **Imbalanced-learn (SMOTE)**: To handle class imbalance in training data.

## Model Training and Prediction
- The machine learning model is trained on a CSV dataset containing various athlete metrics and injury labels.
- Using **SMOTE** (Synthetic Minority Over-sampling Technique), the model handles class imbalances effectively.
- The **Decision Tree Classifier** model is stored as a pickle file (`model.pkl`) and is loaded in the app for generating predictions.

