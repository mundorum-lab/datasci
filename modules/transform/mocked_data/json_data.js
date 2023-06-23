export const freq_cardiaca_data = {
    data: [
        [1, 30, 70],
        [2, 42, 80],
        [3, 50, 75],
        [4, 28, 68],
        [5, 35, 72],
        [6, 60, 85],
        [7, 45, 77],
        [8, 52, 82],
        [9, 38, 73],
        [10, 47, 79]
    ],
    file_id: "2578",
    columns: [
        {name: "paciente_id", type: "int"}, 
        {name: "idade", type: "int"}, 
        {name: "frequência cardíaca (bpm)", type: "int"}
    ]
}

export const imc_data = {
    data: [
        [1, 65, 170],
        [2, 70, 175],
        [3, 80, 180],
        [4, 75, 172],
        [5, 68, 168],
        [6, 72, 173],
        [7, 67, 171],
        [8, 79, 178],
        [9, 73, 176],
        [10, 81, 182]
    ],
    file_id: "2578",
    columns: [
        {name: "paciente_id", type: "int"}, 
        {name: "peso (Kg)", type: "float"}, 
        {name: "altura (cm)", type: "float"}
    ]
}


export const pressao_sanguinea_data = {
    data: [[1, 65, 180],
        [2, 70, 190],
        [3, 80, 200],
        [4, 75, 195],
        [5, 68, 185],
        [6, 72, 195],
        [7, 67, 185],
        [8, 79, 205],
        [9, 73, 195],
        [10, 81, 210],
        [11, 58, 147],
        [12, 51, 143],
        [13, 49, 136],
        [14, 63, 158],
        [15, 46, 132],
        [16, 55, 146],
        [17, 40, 125],
        [18, 54, 141],
        [19, 61, 152],
        [20, 53, 139]],
    file_id: "7578",
    columns: [
        {name: "paciente_id", type: "number"}, 
        {name: "idade", type: "number"}, 
        {name: "pressao_sanguinea", type: "number"}
    ]
}


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