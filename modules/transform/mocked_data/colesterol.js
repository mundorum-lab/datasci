export const colesterol_data = {
    data: [
        [1,30,180],
        [2,42,220],
        [3,50,240],
        [4,28,190],
        [5,35,200],
        [6,60,260],
        [7,45,230],
        [8,52,250],
        [9,38,210],
        [10,47,235]
    ],
    file_id: "4528",
    columns: [
        {name: "paciente_id", type: "number"}, 
        {name: "idade", type: "number"}, 
        {name: "colesterol mg/dL", type: "number"}
    ]
}

export const colesterol_options = {
    fields: [
        { "x": 1, "y": 3 }
      ],
      title: 'Colesterol',
      type: "line"
}