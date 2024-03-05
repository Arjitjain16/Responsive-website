function loco(){
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco()


const tl = gsap.timeline()

tl.from("nav h1, ul li, nav h4",{
    y : -30,
    opacity : 0,
    duration : 0.5,
    stagger : 0.3,
    scrollTigger : {
        trigger : "nav h1, ul li, nav h4",
        scroller : ".main",
    }
})
tl.from(".mid-cont h1, .container>.mid-img",{
    y : -40,
    opacity : 0,
    duration : 0.8,
    stagger : 0.3,
    scrollTigger : {
        trigger : ".mid-cont h1, .container>.mid-img",
        scroller : ".main"
    }
})
tl.from(".container>.box-left,.container>.box-right",{
    x : -30,
    opacity : 0,
    duration : 0.7,
    stagger : 0.3,
    scrollTigger : {
        trigger : ".container>.box-left, .container>.mid-img,.container>.box-right",
        scroller : ".main"
    }
})


let img1 = document.querySelector(".mid-img img")
img1.addEventListener('mouseenter',(e)=>{
    tl.to(".mid-img img",{
        transform : "scale(1.2)",
        duration : 1
    })
})
img1.addEventListener('mouseleave',(e)=>{
    tl.to(".mid-img img",{
        transform : "scale(1)",
        duration : 1
    })
})


// let tl2 = gsap.timeline({
    // scrollTigger : {
    //     trigger : ".left2 h1",
    //     scroller : ".main",
    //     markers : true,
    //     start : "top 100%",
    //     end : "top  30%",
    //     scrub : true
    // }
// })
// tl2.from(".left2 h1",{
//     x : -40,
//     opacity : 0,
// })


var tl2 = gsap.timeline();

tl2.from(".page2 .left2", {
    x:-200,
    duration:2,
    opacity:0,
    scrollTigger : {
        trigger : ".page2 .left2 ",
        scroller : ".main",
        markers : true,
        start : "top 100%",
        end : "top  30%",
        scrub : true
    }
})



// var tl3 = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".page3",
//         scroller: ".main",
//         start: "top 0%",
//         end: "top -70%",
//         scrub: 3,
//         pin: true
//     }
// })
// tl3.to(".pages3", {
//     transform: "translateX(-63%)",
// }, "okay")