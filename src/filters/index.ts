import Vue from "vue";
import { DateFilter, FullDateFilter, SmartDateFilter } from "@/filters/date";
import { ShortLinkFilter } from "@/filters/shortLink";

Vue.filter("date", DateFilter);
Vue.filter("fullDate", FullDateFilter);
Vue.filter("smartDate", SmartDateFilter);

Vue.filter("shortLink", ShortLinkFilter);
