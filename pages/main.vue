<template>
  <div>
    <v-layout
      column
      wrap
      class="my-5"
      align-center
    >
      <!-- xs is pc, sm is moblie -->
      <!-- vuetify grid system have maximum 12 point -->
      <v-flex xs12 sm4 class="my-3">
        <div class="text-xs-center">
          <h2 class="headline">
            «Определите свое значение успеха, добивайтесь его по собственным
            правилам и постройте ту жизнь, которой вы будете гордиться»
          </h2>
          <span class="subheading">
            Узнать больше...
          </span>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-layout row wrap align-center>
            <v-flex xs12 md4>
              <v-card
                class="elevation-0 transparent"
                to="/crm"
              >
                <v-card-text class="text-center">
                  <v-icon x-large class="blue--text text--lighten-2">
                    CRM
                  </v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center">
                    Reach the world
                  </div>
                </v-card-title>
                <v-card-text>
                  Show your stuff to the whole community of Endorfine not only to your mum or your friends. We love making good content viral. In this moment Endorfine is used by artists who are not famous but that want to share their works to the world. Unfortunately with other social networks this is hard, slow and sometime expensive.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card
                to="/fp"
                class="elevation-0 transparent"
              >
                <v-card-text class="text-center">
                  <v-icon x-large class="blue--text text--lighten-2">
                    FinPlan
                  </v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">
                    Fast feedback
                  </div>
                </v-card-title>
                <v-card-text>
                  Time is important, we don't want you to waste it. Here you can get a massive feedback from real users in minutes. And if your stuff is appreciated you won't only get positive feedback but also lovely and sincere fans
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card
                to="/td"
                class="elevation-0 transparent"
              >
                <v-card-text class="text-center">
                  <v-icon x-large class="blue--text text--lighten-2">
                    ToDos
                  </v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center">
                    Create new connections
                  </div>
                </v-card-title>
                <v-card-text>
                  Imagine if you can directly speak with the world's population. Don't you think it would be easier to find nice people to interact with? Endorfine is both local and global and help you to connect without limitations with people from your city, your state and your universe!
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-layout row wrap align-center>
            <v-flex xs12 md4>
              <v-card
                class="elevation-0 transparent"
                to="/crm"
              >
                <v-card-text class="text-center">
                  <v-icon x-large class="blue--text text--lighten-2">
                    CRM
                  </v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center">
                    Reach the world
                  </div>
                </v-card-title>
                <v-card-text>
                  Show your stuff to the whole community of Endorfine not only to your mum or your friends. We love making good content viral. In this moment Endorfine is used by artists who are not famous but that want to share their works to the world. Unfortunately with other social networks this is hard, slow and sometime expensive.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card
                to="/fp"
                class="elevation-0 transparent"
              >
                <v-card-text class="text-center">
                  <v-icon x-large class="blue--text text--lighten-2">
                    FinPlan
                  </v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">
                    Fast feedback
                  </div>
                </v-card-title>
                <v-card-text>
                  Time is important, we don't want you to waste it. Here you can get a massive feedback from real users in minutes. And if your stuff is appreciated you won't only get positive feedback but also lovely and sincere fans
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card
                to="/td"
                class="elevation-0 transparent"
              >
                <v-card-text class="text-center">
                  <v-icon x-large class="blue--text text--lighten-2">
                    ToDos
                  </v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center">
                    Create new connections
                  </div>
                </v-card-title>
                <v-card-text>
                  Imagine if you can directly speak with the world's population. Don't you think it would be easier to find nice people to interact with? Endorfine is both local and global and help you to connect without limitations with people from your city, your state and your universe!
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

export default {
  name: 'User',
  head: {
    title: 'Система'
  },
  layout: 'user.layout'
}
</script>

<style scoped>

</style>
