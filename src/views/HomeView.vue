<script setup lang="ts">
  // import { ref } from 'vue';
  // import { TresCanvas } from '@tresjs/core';
  // import SceneWrapper from '@/components/SceneWrapper.vue';
  // import FirstExperience from '@/components/FirstExperience.vue';
  import MapsInteractive from '@/components/MapsInteractive.vue';
  import NewMaps from '@/components/NewMaps.vue';

  // import { useProgress } from '@tresjs/cientos';
  // import { ThemePresent } from '@/types';

  // const experienceRef = ref<InstanceType<typeof FirstExperience>>();

  // const { hasFinishLoading, progress } = await useProgress();

  // const currentTheme = ref<{ preset: ThemePresent }[]>([
  //   { preset: ThemePresent.Night },
  //   { preset: ThemePresent.Sunset },
  //   { preset: ThemePresent.Umbrellas },
  //   { preset: ThemePresent.Snow },
  //   { preset: ThemePresent.Urban },
  //   { preset: ThemePresent.Modern },
  // ]);
  // const changeThemePresent = (themePresent: ThemePresent) => {
  //   if (!experienceRef.value) { return };
  //   experienceRef.value.changeThemePresent(themePresent);
  // };
</script>
<template>
  <!-- <SceneWrapper>
    <Transition name="fade-overlay"
      enter-active-class="opacity-1 transition-opacity duration-200"
      leave-active-class="opacity-0 transition-opacity duration-200">
      <div v-show="!hasFinishLoading"
        class="absolute bg-default t-0 l-0 w-full h-full z-20 flex justify-center items-center font-mono">
        <div class="w-200px">
          Loading... {{ progress }}%
        </div>
      </div>
    </Transition>
    <TresCanvas clear-color="#82DBC5">
      <FirstExperience ref="experienceRef" />
    </TresCanvas>
    <div class="absolute flex justify-end items-center z-30 bottom-1 right-1 gap-1 flex-wrap">
      <h3>Change Background:</h3>
      <button v-for="theme in currentTheme"
        :key="theme.preset"
        @click="changeThemePresent(theme.preset)"
        class="sm:w-100px md:w-200px bg-black bg-opacity-70 hover:bg-opacity-100 text-[7px] md:text-sm text-white font-bold py-2 px-4 rounded">
        {{ theme.preset }}
      </button>
    </div>
  </SceneWrapper> -->
  <!-- <MapsInteractive /> -->
  <NewMaps />
</template>
