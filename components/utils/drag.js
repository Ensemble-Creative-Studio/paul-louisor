export const drag = () => {
if (document.querySelector(".hideScrollBar")) {
    const sliders = document.querySelectorAll(".hideScrollBar ");

    sliders.forEach((slider, index) => {

      console.log(slider);

      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDown = true;

        setTimeout(() => {
          slider.classList.add("active");
          slider.classList.remove('passive')
        }, 150);

        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelMomentumTracking();
      });

      slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
      });

      slider.addEventListener("mouseup", () => {
        isDown = false;
        setTimeout(() => {
          slider.classList.remove("active");
          slider.classList.add("passive");
        }, 300);


        beginMomentumTracking();
      });

      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 0.8; //scroll-fast
        var prevScrollLeft = slider.scrollLeft;
        slider.scrollLeft = scrollLeft - walk;
        velX = slider.scrollLeft - prevScrollLeft;
      });

      // Momentum

      var velX = 0;
      var momentumID;

      slider.addEventListener("wheel", (e) => {
        cancelMomentumTracking();
      });

      function beginMomentumTracking() {
        cancelMomentumTracking();
        momentumID = requestAnimationFrame(momentumLoop);
      }
      function cancelMomentumTracking() {
        cancelAnimationFrame(momentumID);
      }
      function momentumLoop() {
        slider.scrollLeft += velX;
        velX *= 0.95;
        if (Math.abs(velX) > 0.5) {
          momentumID = requestAnimationFrame(momentumLoop);
        }
      }
    });
  }

}