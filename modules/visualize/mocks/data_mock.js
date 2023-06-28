export const mockedData = {
    "columns": [
        {"name": "Nome do produto", "type": "string"},
        {"name": "Preço Médio (R$)", "type": "number"},
        {"name": "Quantidade em Estoque", "type": "number"},
        {"name": "Vendas Mensais", "type": "number"}
    ],
    "data": [
        ["Camiseta", 49.90, 100, 50],
        ["Calça Jeans", 99.90, 50, 30],
        ["Tênis", 199.90, 30, 20],
        ["Jaqueta", 149.90, 20, 15],
        ["Saia", 39.90, 80, 40],
        ["Blusa", 29.90, 120, 60],
        ["Shorts", 49.90, 70, 35]
      ]
}

export const scatter_mockData = {
    "columns": [
        {"name":"y1", "type": "num"},
        {"name":"y2", "type": "num"},
        {"name":"x" , "type": "num"}
    ],
    "data": [
        [2,1,0],
        [3,2,1],
        [4,3,2],
        [5,4,3],
        [6,5,4],
        [7,6,5]
    ]
}

export const cluster_mockData = {
    "columns": [
        {"name":"cluster", "type":"number"},
        {"name":"x", "type": "number"},
        {"name":"y" , "type": "number"}
    ],
    "data": [
        [1,1,0],
        [1,1,1],
        [2,2,0],
        [2,2,1],
        [3,3,0],
        [3,3,1]
    ]
}