<template>
  <div class="home">
    <div class="card w-96 bg-base-100 shadow-xl">
      <figure><img src="../assets/logo.png" alt="Vue" /></figure>
      <div class="card-body">
        <p>{{ text }}</p>
        <p>Количество лайков: {{ likes }}</p>
        <my-input v-model:value="password"/>
        <div class="card-actions justify-end">
          <my-button></my-button>
          <button class="btn btn-primary" @click="addLike">Like</button>
          <button class="btn btn-ghost" @click="addDislike">Dislike</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import MyButton from "@/components/ui/MyButton.vue";
import MyInput from "@/components/ui/MyInput.vue";

export default {
  name: 'HomeView',
  data() {
    return {
      likes: 0,
      text: '',
      uid: '',
    }
  },
  methods: {
    ...mapActions({
      updateLikes: 'user/updateLikes',
      getUserByUid: "user/getUserByUid",
    }),
    addLike() {
      this.likes += 1
      if(this.uid){
        this.updateLikes({likes: this.likes})
      }
    },
    addDislike() {
      this.likes -= 1
      if(this.uid){
        this.updateLikes({likes: this.likes})
      }
    },
  },
  watch: {
    likes() {
      if(this.likes < 0) {
        this.likes = 0
      }
    }
  },
  async mounted() {
    this.uid = localStorage.getItem('uid')
    if(this.uid) {
      await this.getUserByUid()
      this.likes = this.$store.state.user.user?.likes || 0
      this.text = `Вы авторизованы как ${this.uid}`;
    }
    else{
      this.text = `Вы не авторизованы, счетчик обнулен`;
    }
  },
  components: {
    MyInput,
    MyButton

  }
}
</script>

<style>
  .window {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 70vw;
    height: 300px;
    background-color: #42b983;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    row-gap: 15px;
  }
  .window-label {
    font-size: 1.5rem;
  }
  .btns {
    display: flex;
    flex-direction: row;
    column-gap: 15px;
    background-color: #fff;
    border-radius: 6px;
  }
  .btn {
    padding: 10px;
    cursor: pointer;
    border: #000 1px solid;
    border-radius: 6px;
  }
  .dislike img {
    transform: rotate(180deg);
  }
</style>