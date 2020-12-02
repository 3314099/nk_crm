<template>
  <div class="ma-2">
    <v-tabs
      v-model="tabMode"
      background-color="transparent"
      grow
    >
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        :href="tab.href"
        @click="chgTabMode(tab.to)"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
import resetStore from '@/mixins/reset-store'
export default {
  name: 'TabPanel',
  mixins: [resetStore],
  data: () => {
    return {
      tabs: [
        {
          name: 'РАЗДЕЛЫ И ГРУППЫ',
          href: '#sectAndGrp',
          to: 'propertySectAndGrps'
        },
        {
          name: 'СЧЕТА',
          href: '#accounts',
          to: 'propertyAccounts'
        },
        {
          name: 'КАТЕГОРИИ',
          href: '#categories',
          to: 'propertyCategories'
        },
        {
          name: 'ФИЛЬТРЫ',
          href: '#filters',
          to: 'propertyFilters'
        },
        {
          name: 'ТЭГИ',
          href: '#tags',
          to: 'propertyTags'
        },
        {
          name: 'УЧАСТНИКИ',
          href: '#participants',
          to: 'propertyParticipants'
        }
      ]
    }
  },
  computed: {
    tabMode () {
      const vTabMode = this.$store.getters['mode/tabMode']
      let tabMode
      switch (vTabMode.tab) {
        case ('propertyAccounts'):
          tabMode = 'accounts'
          break
        case ('propertyCategories'):
          tabMode = 'categories'
          break
        case ('propertyFilters'):
          tabMode = 'filters'
          break
        case ('propertyTags'):
          tabMode = 'tags'
          break
        case ('propertyParticipants'):
          tabMode = 'participants'
          break
        default:
          tabMode = 'sectAndGrp'
          break
      }
      return tabMode
    }
  },
  created () {
    const vTabMode = this.$store.getters['mode/tabMode']
    if (!vTabMode.tab || !vTabMode.tab.includes('property')) {
      this.chgTabMode('propertySectAndGrps')
    }
  },
  methods: {
    chgTabMode (mode) {
      this.$store.commit('mode/chgTabMode', { tab: mode, content: 'default' })
    }
  }
}
</script>

<style scoped>
</style>
