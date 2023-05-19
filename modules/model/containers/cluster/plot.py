import matplotlib.pyplot as plt

x = [4, 5, 10, 4, 3, 11, 14, 6, 10, 12]
y = [21, 19, 24, 17, 16, 25, 24, 22, 21, 21]

arr = []
for i in range(len(x)):
    arr.append([x[i], y[i]])
print(arr)

plt.scatter(x, y)
plt.scatter([4.4, 11.4], [19, 23], color='red')
plt.show()