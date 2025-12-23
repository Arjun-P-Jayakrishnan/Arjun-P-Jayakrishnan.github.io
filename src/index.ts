import { carousel, initTechCarousel } from "2d/carousel";
import { initVisorBoot } from "2d/init";
import { addOutro } from "2d/outro";
import { initProjects } from "2d/proect_carosel";
import { initVisorHUD } from "2d/scroll";
import { bootstrap } from "engine/core/Bootstrap";

bootstrap();
initVisorBoot();
initVisorHUD();
carousel();
initProjects();
initTechCarousel();
addOutro();
