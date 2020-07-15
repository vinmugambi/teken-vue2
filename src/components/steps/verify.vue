<template>
  <div class="pt-4">
    <div
      v-for="step in noMediaSteps"
      :key="step.title"
      class="pb-2 border-b border-purple-100"
    >
      <div class="flex items-center px-4 pt-2 justify-between">
        <h4 class="font-bold">{{ step.title }}</h4>
        <button
          class="block px-4 py-1 text-sm text-blue-600 border font-bold rounded hover:bg-purple-100"
          @click="jump(step.id)"
        >
          edit
        </button>
      </div>
      <ul>
        <li
          v-for="question in step.questions"
          :key="question.name"
          class="py-2 px-4 flex"
        >
          <p class="w-1/3 leading-none text-sm border-r-2 border-purple-100 pr-1">
            {{ question.label }}
          </p>
          <p class="w-2/3 flex items-center leading-none text-sm pl-2">
            {{ $store.state.current[question.name] | capitalize }}
          </p>
        </li>
      </ul>
    </div>

    <div class="pb-2 pt-2 px-4">
      <h4 class="font-bold">Uploaded Documents</h4>
      <ul class="py-2">
        <li
          class="flex py-2 border-purple-100"
          v-for="(step, index) in mediaSteps"
          :class="index < mediaSteps.length - 1 ? 'border-b' : ''"
          :key="step.title"
        >
          <!-- :style="`background-image: url('${$store.state.current[step.questions[0]]}')`" -->
          <div class="bg-purple-100 w-16 h-16">
            <img
              v-if="$store.state.current[step.questions[0]]"
              class="w-full h-full object-cover"
              :src="$store.state.current[step.questions[0]]"
            />
          </div>
          <div class="pl-4">
            <h6>
              <i class="block leading-tight">{{ step.title }}</i>
            </h6>
            <div class="flex">
              <button
                class="block px-2 mr-2 text-sm text-blue-600 border rounded hover:bg-purple-100"
                @click="jump(step.id)"
              >
                change
              </button>
              <a
                class="block px-2 mr-2 text-sm text-blue-600 border rounded hover:bg-purple-100 hover:cursor-pointer"
                :href="$store.state.current[step.questions[0]]"
                target="_blank"
              >
                view
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { india } from "./fifth.js";

const steps = india.steps.map(step => {
  let showing = Object.keys(india[step].questions).filter(key => {
    if (india[step].showing) {
      return india[step].showing.includes(india[step].questions[key].index);
    }
  });
  let questions = showing.map(question => {
    if (!india[step].media) {
      return {
        name: question,
        id: india[step].questions[question].index,
        label: india[step].questions[question].label
      };
    } else return question;
  });

  return {
    title: india[step].title,
    id: step,
    questions,
    media: india[step].media || false
  };
});

const mediaSteps = steps.filter(step => step.media === true);
const nonMediaSteps = steps.filter(step => !step.media);

export default {
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      // return value.charAt(0).toUpperCase() + value.slice(1);
      return value.toUpperCase();
    }
  },
  setup(props, { root, emit }) {
    const current = root.$store.state.current;

    const noMediaSteps = nonMediaSteps.map(step => {
      return (step = {
        ...step,
        questions: step.questions.filter(question => {
          if (current[question.name]) return true;
        })
      });
    });

    function jump(step) {
      emit("jump", step);
    }

    return {
      mediaSteps,
      noMediaSteps,
      jump
    };
  }
};
</script>
