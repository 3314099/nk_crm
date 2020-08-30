<template>
  <v-list two-line subheader>
    <v-subheader inset>
      CRM
    </v-subheader>

    <v-list-item
      v-for="item in items"
      :key="item.title"
    >
      <v-list-item-avatar>
        <v-icon
          :class="[item.iconClass]"
          v-text="item.icon"
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
        <v-list-item-subtitle v-text="item.subtitle" />
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon>
          <v-icon color="grey lighten-1">
            mdi-information
          </v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-divider inset />

    <v-subheader inset>
      Files
    </v-subheader>

    <v-list-item
      v-for="item in items2"
      :key="item.title"
    >
      <v-list-item-avatar>
        <v-icon
          :class="[item.iconClass]"
          v-text="item.icon"
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
        <v-list-item-subtitle v-text="item.subtitle" />
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon>
          <v-icon color="grey lighten-1">
            mdi-information
          </v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'LBcrm',
  data: () => ({
    items: [
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
    ],
    items2: [
      { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
      { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' }
    ]
  })
}
</script>

<style scoped>

</style>
