import matplotlib.pyplot as plt

x_0 = [4.4, 11.4]
y_0 = [19, 23]

x_1 = [4, 5, 4, 3, 6]
y_1 = [21, 19, 17, 16, 22]

x_2 = [10, 11, 14, 10, 12]
y_2 = [24, 25, 24, 21, 21]

plt.plot(x_0, y_0, "go", x_1, y_1, "ro", x_2, y_2, "bo")
plt.savefig("cluster_view.png")