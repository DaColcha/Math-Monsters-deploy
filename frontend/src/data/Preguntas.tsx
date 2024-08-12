import { QuestionType } from "../types"

const Peguntas: QuestionType[] = [
    {
        pregunta: "Encuentra el 5to término de la sucesión dado su término general: an = 3n - 1",
        respuesta: "14", // Convertir la respuesta a string para que coincida con el tipo de datos
        opciones: ["8", "5", "11", "14"], // Convertir las opciones a string
        pasos: "a5 = 3x5 - 1 = 14"
    },
    {
        pregunta: "Encuentra el 6to término de la sucesión dado su término general: an = n^2",
        respuesta: "36", // Convertir la respuesta a string
        opciones: ["12", "24", "36", "72"], // Convertir las opciones a string
        pasos: "a6 = 6^2 = 6x6 = 36"
    },
    {
        pregunta: "Encuentra el término a1 dado: a4 = 11, a5 = 14",
        respuesta: "2", // Convertir la respuesta a string
        opciones: ["3", "4", "9", "2"], // Convertir las opciones a string
        pasos: "a1 = a5 - (5-1)*d = 14 - 12 = 2"
    },
    {
        pregunta: "Encuentra el término a1 dado: a4 = 23, d = 4",
        respuesta: "11", // Convertir la respuesta a string
        opciones: ["8", "5", "15", "11"], // Convertir las opciones a string
        pasos: "a1 = a4 - (4-1)*d = 23 - 12"
    },
    {
        pregunta: "¿Qué característica distingue a una progresión geométrica decreciente?",
        opciones: [
            "El primer término es siempre mayor que 1.",
            "La razón común es un número positivo mayor que 1.",
            "La razón común es un número negativo.",
            "La razón común es un número positivo menor que 1."
        ],
        respuesta: "La razón común es un número positivo menor que 1."
    },
    {
        pregunta: "¿Qué ocurre con una progresión geométrica cuando la razón común es negativa?",
        opciones: [
            "Los términos se alternan en signo.",
            "Los términos son todos positivos.",
            "La progresión es aritmética.",
            "Los términos decrecen sin alternar."
        ],
        respuesta: "Los términos se alternan en signo."
    },
    {
        pregunta: "¿Cuál de las siguientes secuencias representa una progresión aritmética?",
        opciones: [
            "3, 6, 12, 24, 48",
            "5, 10, 15, 20, 25",
            "2, 4, 8, 16, 32",
            "7, 14, 28, 56, 112"
        ],
        respuesta: "5, 10, 15, 20, 25"
    },
    {
        pregunta: "¿Qué condición debe cumplirse para que una progresión aritmética sea creciente?",
        opciones: [
            "La diferencia común debe ser positiva.",
            "La diferencia común debe ser negativa.",
            "El primer término debe ser mayor que la diferencia común.",
            "La suma de todos los términos debe ser positiva."
        ],
        respuesta: "La diferencia común debe ser positiva."
    },
    {
        pregunta: "Si el séptimo término de una progresión aritmética es 21 y el primer término es 3, ¿cuál es la diferencia común?",
        opciones: ["2", "3", "4", "6"], // Convertir las opciones a string
        respuesta: "3", // Convertir la respuesta a string
        pasos: "21 = 3 + d(7-1)"
    },
    {
        pregunta: "Si el cuarto término de una progresión geométrica es 54 y el primer término es 2, ¿cuál es la razón común?",
        opciones: ["3", "8", "27", "9"], // Convertir las opciones a string
        respuesta: "3", // Convertir la respuesta a string
        pasos: "54 = 2 * r^(3)"
    },
]

export default Peguntas;
