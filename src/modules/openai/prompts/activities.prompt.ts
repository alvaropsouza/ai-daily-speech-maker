import { Activity } from '@prisma/client';

export const activitiesPrompt = (
  activities: Activity[],
): {
  getActivitiesSummaryPrompt: { role: 'system'; content: string };
} => {
  return {
    getActivitiesSummaryPrompt: {
      role: 'system',
      content: `Aqui está um resumo de tudo que fiz no dia, por favor, crie um pequeno texto para que eu possa apresentar na minha 
        reunião da daily, sou desenvolvedor de software, escreva de forma prática, sem adicionar muitos comentários mas também sem deixar 
           muito vazio. no final, identifique se eu tive ou não impedimentos e diga: sem impedimentos, ou com impedimentos. 
           Atividades realizadas: ${JSON.stringify(activities)}`,
    },
  };
};
