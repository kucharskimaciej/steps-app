import "reflect-metadata";
import Vue from "vue";
import VueTypedi from "vue-typedi";
import Vuex from "vuex";

import "./mocks";
import "../main.css";
import "../filters";
import "../plugins";

Vue.use(VueTypedi);
Vue.use(Vuex);
