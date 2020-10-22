<template>
  <v-app light>
    <!-- ///header start/// -->
    <v-toolbar>
      <!-- navigation icon -->
      <!--      <v-app-bar-nav-icon>-->
      <!--        <img :src="imageLink.logo" alt="Vuetify.js" height="50">-->
      <!--      </v-app-bar-nav-icon>-->
      <!-- titile, synced text by v-text -->
      <v-toolbar-title class="mx-0" v-text="title" />
      <p>Beta</p>
      <SnackBar />
      <!-- make space -->
      <v-spacer />
      <!-- menu item -->
      <v-toolbar-items>
        <!--        <v-btn-->
        <!--          @click="snackBar('testButton')"-->
        <!--        >-->
        <!--          testSnackBar-->
        <!--        </v-btn>-->
        <!--        <v-btn to="/main?message=aaa">-->
        <!--          message-->
        <!--        </v-btn>-->
        <!--        <v-btn to="/admin">-->
        <!--          Admin-->
        <!--        </v-btn>-->
        <!--        <v-btn-->
        <!--          to="/main"-->
        <!--          text-->
        <!--          class="pink lighten-3"-->
        <!--        >-->
        <!--          Main-->
        <!--        </v-btn>-->
      </v-toolbar-items>
    </v-toolbar>
    <!-- ///header end/// -->
    <!-- <section>
            <v-parallax :src="imageLink.sub_main" height="600">
              <v-layout column align-center justify-center class="white--text">
                <h1 class="white--text mb-2 display-1 text-xs-center" style="font-weight: 900; text-shadow: 3px 2px #000000">The social network for epic content</h1>
                <div class="white--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #000000">Unlesh your creativity without limitations</div>
                <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
                  Get Started
                </v-btn>
              </v-layout>
            </v-parallax>
          </section> -->

    <!-- ///hero image slider start/// -->

    <!-- ///hero image slider end/// -->

    <!-- content -->
    <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <!-- xs is pc, sm is moblie -->
        <!-- vuetify grid system have maximum 12 point -->
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="blue--text text--lighten-2">
                      public
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
                <component :is="component" :chg-mode="chgVuexMode" />
                <!--                    <v-card-text class="text-center">-->
                <!--                      <v-icon x-large class="blue&#45;&#45;text text&#45;&#45;lighten-2">-->
                <!--                        flash_on-->
                <!--                      </v-icon>-->
                <!--                    </v-card-text>-->
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="blue--text text--lighten-2">
                      share
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
    </section>

    <section>
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
        >
          <v-sheet
            height="100%"
          >
            <v-parallax :src="imageLink.sub_main" height="600">
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <div class="display-3">
                  {{ slide }} Slide
                </div>
              </v-row>
            </v-parallax>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </section>

    <section>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 text-xs-center class="mt-5">
            <div class="headline">
              Are you amazed? Stay tuned!
            </div>
            <br>
            <div>We are lunching the beta in a few time. If you want to be one of the first Endorfine users we will email you as soon as we're ready. In the beginning only few people will test before the launch. Let us know how Endorfine will help you!</div>
          </v-flex>
          <v-flex xs8 offset-xs2>
            <v-card class="elevation-0 transparent">
              <v-card-text>
                <v-flex v-if="!subscribed" xs12>
                  <v-text-field
                    v-model="email"
                    filled
                    label="Email address"
                    :rules="emailRules"
                    hint="Enter your email!"
                    persistent-hint
                  />
                </v-flex>
                <v-flex v-if="!subscribed" xs12>
                  <v-text-field filled multi-line label="Bio and curiosities" />
                </v-flex>
                <v-flex v-if="!subscribed" xs12 class="text-xs-center">
                  <v-btn class="blue lighten-2 mb-5" dark large @click="subscribe">
                    Get in touch
                  </v-btn>
                </v-flex>
                <v-flex v-if="subscribed" xs12 class="text-xs-center">
                  <v-btn class="green lighten-2 mb-5" dark large>
                    Welcome on board!
                  </v-btn>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section>
      <v-parallax :src="imageLink.main" height="380">
        <v-layout column align-center justify-center>
          <div class="headline white--text mb-3 text-xs-center">
            Endorfine is a social network that allows everyone to reach a huge audience with a tap
          </div>
          <em>With the power of Endorfine you don't need to be famous or post pics of cute cats in order to get visibility</em>
          <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
            Get more info
          </v-btn>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 text-xs-center class="mt-5">
            <div class="headline">
              Are you amazed? Stay tuned!
            </div>
            <br>
            <div>We are lunching the beta in a few time. If you want to be one of the first Endorfine users we will email you as soon as we're ready. In the beginning only few people will test before the launch. Let us know how Endorfine will help you!</div>
          </v-flex>
          <v-flex xs8 offset-xs2>
            <v-card class="elevation-0 transparent">
              <v-card-text>
                <v-flex v-if="!subscribed" xs12>
                  <v-text-field
                    v-model="email"
                    filled
                    label="Email address"
                    :rules="emailRules"
                    hint="Enter your email!"
                    persistent-hint
                  />
                </v-flex>
                <v-flex v-if="!subscribed" xs12>
                  <v-text-field filled multi-line label="Bio and curiosities" />
                </v-flex>
                <v-flex v-if="!subscribed" xs12 class="text-xs-center">
                  <v-btn class="blue lighten-2 mb-5" dark large @click="subscribe">
                    Get in touch
                  </v-btn>
                </v-flex>
                <v-flex v-if="subscribed" xs12 class="text-xs-center">
                  <v-btn class="green lighten-2 mb-5" dark large>
                    Welcome on board!
                  </v-btn>
                </v-flex>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <section>
      <v-parallax :src="imageLink.social_cover" height="380">
        <v-layout column align-center justify-center>
          <div class="headline white--text mb-3 text-xs-center">
            We are dropping cool news and opportunities on socials
          </div>
        </v-layout>
        <v-layout justify-space-around justify-center>
          <v-icon x-large dark>
            fab fa-facebook-f
          </v-icon>

          <v-icon x-large dark>
            fab fa-twitter
          </v-icon>

          <v-icon x-large dark>
            fab fa-reddit-alien
          </v-icon>

          <v-icon x-large dark>
            fab fa-instagram
          </v-icon>

          <v-icon x-large dark>
            fab fa-discord
          </v-icon>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">
                  Company info
                </div>
              </v-card-title>
              <v-card-text>
                We are not a company. We hate companies. Just imagine us like the guys from the Silicon Valley series.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">
                  We are hiring
                </div>
              </v-card-title>
              <v-card-text>
                Are you a creative person? Do you like techy stuff? Complete the email form by writing your skills and interests
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <section>
      <v-container>
        <v-layout column align-center justify-center>
          <v-flex xs12 class="text-xs-center">
            <img height="200px" :src="imageLink.logo">
          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <v-footer class="blue darken-2">
      <v-layout row wrap align-center column justify-center>
        <v-flex xs12 class="text-xs-center">
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">
              favorite
            </v-icon>
            using <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import SnackBar from '@/components/layoutsComponents/SnackBar'
import login from '@/components/auth/login'
import registration from '@/components/auth/AuthRegistration'
export default {
  name: 'Landing',
  components: {
    SnackBar,
    login,
    registration
  },
  data () {
    return {
      component: 'login',
      title: 'Endorfine',
      imageLink: {
        main:
          'https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fb13f0434-b228-11e6-8e5d-5252025056ab_web_scale_0.4666667_0.4666667__.jpg?alt=media&token=660df23e-599e-434b-9313-ba69c973eeea',
        sub_main:
          'https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2FNight-Club-Clubbing-Jobs-Abroad2.jpg?alt=media&token=82bbda7d-5df4-430b-9217-adaf1c8485c5',
        logo:
          'https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fandroid-chrome-512x512.png?alt=media&token=8a0a66f6-4741-4ff6-8f28-eb9ec74374df',
        social_cover:
          'https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fo-NIGHTCLUB-facebook.jpg?alt=media&token=cefc5c4c-9714-41da-9c22-f63caf5e89a4'
      },
      email: '',
      emailRules: [
        (v) => {
          return !!v || 'E-mail is required'
        },
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ],
      subscribed: false,
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth'
      ]
    }
  },
  computed: {
    editMode () {
      return this.$store.getters['mode/editMode']
    }
  },
  watch: {
    editMode (v) {
      this.chgComponent(v)
    }
  },
  methods: {
    chgVuexMode (val) {
      this.$store.dispatch('mode/chgEditMode', { mode: val, item: {} })
    },
    chgComponent () {
      const editMode = this.$store.getters['mode/editMode']
      switch (editMode) {
        case 'registration':
          this.component = 'registration'
          break
        default:
          this.component = 'login'
          break
      }
    },
    subscribe () {
      this.subscribed = !this.subscribed
    },
    snackBar (val) {
      this.$store.dispatch('snackBar/changeSnackBar', val)
    }
  },
  head: {
    title: 'Главная'
  },
}
</script>
