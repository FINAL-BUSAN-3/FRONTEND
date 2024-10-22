<template>
  <div>
    <h1>ModelDetail.vue</h1>
  </div>
</template>


<script>
export default {
  name: 'ModelDetail',
  data() {
    return {
      modelDetails: [
        {
          id: 1,
          name: 'press-2',
          version: 2,
          fileDate: '2024-10-05 15:23',
          fileSize: '3.12',
          framework: 'Scikit learn',
          trainingInfo: 'KNN',
          deploymentDate: '2024-10-05 15:23',
          avgLoss: 0.08,
          avgAccuracy: 0.92
        },
        {
          id: 2,
          name: 'press-3',
          version: 3,
          fileDate: '2024-10-05 17:23',
          fileSize: '3.12',
          framework: 'Scikit learn',
          trainingInfo: 'KNN',
          deploymentDate: '2024-10-05 17:23',
          avgLoss: 0.04,
          avgAccuracy: 0.98
        }
      ]
    };
  }
};
</script>
