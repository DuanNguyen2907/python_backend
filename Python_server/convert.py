# Import Dependencies
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import tensorflow as tf

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Gradient Boosting Classifier
clf = GradientBoostingClassifier()
clf.fit(X_train, y_train)

# Save trained model as .joblib file
joblib.dump(clf, 'trained_model.joblib')

# Load the model from .joblib file
loaded_model = joblib.load('trained_model.joblib')

# Convert the loaded model to TensorFlow format
input_shape = X_train[0].shape
tf_model = tf.keras.Sequential([
    tf.keras.layers.InputLayer(input_shape=input_shape),
    tf.keras.layers.Dense(10, activation='relu'),
    tf.keras.layers.Dense(3, activation='softmax')
])
tf_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train TensorFlow model
tf_model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_test, y_test))

# Convert TensorFlow model to TensorFlow Lite model
converter = tf.lite.TFLiteConverter.from_keras_model(tf_model)
tflite_model = converter.convert()

# Save TensorFlow Lite model to file
with open('trained_model.tflite', 'wb') as f:
    f.write(tflite_model)
