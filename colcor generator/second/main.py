from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

def detect_dominant_color(image_path, k=3):
    # 1. Rasmni yuklash
    image = Image.open(image_path)
    image = image.resize((100, 100))  # Tahlilni tezlashtirish uchun kichraytiramiz
    image_data = np.array(image)
    
    # 2. Rang ma'lumotlarini tekislaymiz
    pixels = image_data.reshape((-1, 3))
    
    # 3. K-Means algoritmini qo'llash
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(pixels)
    
    # 4. Dominant rangni aniqlash
    dominant_color = kmeans.cluster_centers_[kmeans.labels_[0]]
    return tuple(map(int, dominant_color))  # Dominant rangni qaytarish

# Rasmdan dominant rangni aniqlash
image_path = "aaa.png"  # Rasm faylining yo'li
dominant_color = detect_dominant_color(image_path)
print("Dominant rang (RGB):", dominant_color)

# Dominant rangni generatsiya qilish
plt.figure(figsize=(2, 2))
plt.imshow([[list(dominant_color)]])
plt.axis('off')
plt.show()
