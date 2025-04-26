<template>
  
    <div v-if="visible" class="toast" :class="type">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    name : "ToastCard",
    props: {
      message: String,
      type: {
        type: String,

      }
    },
    data() {
      return {
        visible: true,
      };
    },
    mounted() {
      setTimeout(() => {
        this.visible = false;
      }, 3000); // Toast disappears after 3 seconds
    }
  };
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    top: 20px;
    right: -300px;
    background: #444;
    color: #fff;
    padding: 12px 20px;
    border-radius: 6px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    animation: slide-in 0.5s forwards;
    z-index: 9999;
    min-width: 200px;
  }
  
  .toast.success {
    background: #4CAF50;
  }
  
  .toast.error {
    background: #f44336;
  }
  
  .toast.info {
    background: #2196F3;
  }
  
  @keyframes slide-in {
    to {
      right: 20px;
    }
  }
  </style>