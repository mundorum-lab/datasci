import matplotlib.pyplot as plt

x = [4, 5, 10, 4, 3, 11, 14, 6, 10, 12]
y = [21, 19, 24, 17, 16, 25, 24, 22, 21, 21]

cluster1 = [[4,21],[5,19],[4,17],[3,16],[6,22]]
x1 = [x for x, _ in cluster1]
y1 = [y for _, y in cluster1]

cluster2 = [[10,24],[11,25],[14,24],[10,21],[12,21]]
x2 = [x for x, _ in cluster2]
y2 = [y for _, y in cluster2]

plt.scatter(x1, y1, color='green')
plt.scatter(x2, y2, color='blue')
plt.scatter([4.4, 11.4], [19, 23], color='red')
plt.show()