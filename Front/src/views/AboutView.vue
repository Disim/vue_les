<template>
  <div class="home">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Здравствуйте, {{ user?.name }}</h2>
        <p>Аккаунт создан: {{ user?.createdAt.substr(0, 10) }}</p>
        <details class="collapse bg-base-200">
          <summary class="collapse-title text-xl font-medium">Посмотреть Json</summary>
          <div class="collapse-content">
            <p>{{ user }}</p>
          </div>
        </details>
        <div class="card-actions justify-end">
          <div class="badge badge-primary">Лайки: {{ user?.likes }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import PostCreate from '@/components/PostCreate.vue'
import PostList from '@/components/PostList.vue';

export default {
  name: 'about',
  data() {
    return {
      posts: []
    }
  },  
  methods: {
    ...mapActions({
      getUserByUid: 'user/getUserByUid'
    }),
    createPost(post) {
      this.posts.unshift(post)
    }
  },
  mounted() {
    this.getUserByUid()
  },
  computed: {
    user() {
      return this.$store.state.user.user
    }
  },
  components: {
    PostCreate,
    PostList
  }
}
</script>
