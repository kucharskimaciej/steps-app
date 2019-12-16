import Vue from "vue";
import { DateFilter, FullDateFilter, SmartDateFilter } from "@/filters/date";

Vue.filter("date", DateFilter);
Vue.filter("fullDate", FullDateFilter);
Vue.filter("smartDate", SmartDateFilter);
