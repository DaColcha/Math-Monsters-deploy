export type ChestType = {
    chestNumber: number;
    isMonster: boolean;
    coins: number;
    isOpen: boolean;
}
export type QuestionType = {
    pregunta: string; // El texto de la pregunta
    opciones: string[]; // Un array de strings que contiene las posibles respuestas
    respuesta: string; // La respuesta correcta
    pasos?: string; // Opcional, puede contener una explicación o pasos adicionales después de la respuesta
  }