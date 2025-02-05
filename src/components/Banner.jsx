import styles from "./Banner.module.css";

function Banner() {
  return (
    <>
      <div className={styles.bannerImage}>
        <img src="./lara.png" style={{ width: "90%" }} />
      </div>
      <div className={styles.textContent}>
        <div style={{ float: "right" }}>
          <h1>Woof woof! Hey there, hoomans! 🐶💛</h1>
          <h3>
            I'm Lara, the official supervisor (and snack enthusiast) of my
            hooman's coding adventures. And guess what? They've been working
            their paws off on a frontend test for Fetch Rewards—all about dog
            adoption! 🦴✨
            <br />
            My hooman is crafting a sleek, user-friendly portal where hoomans
            can browse through adorable pups and experience what a real adoption
            platform might feel like.
            <br />
            I may not know much about JavaScript, React, or APIs (I prefer
            snacks over stacks), but I do know that my hooman is passionate
            about building intuitive, well-structured applications. So go easy
            on them! Or don't—I hear engineers love a good challenge. 😆
            <br />
            So, hoomans, I hope you enjoy checking out my hooman's work! And if
            you need a professional bug sniffer or emotional support pup, I'm
            available for consulting… in exchange for belly rubs. 🐾💖
          </h3>
          <h2>Lara, CEO (Chief Excitement Officer) of Woof Inc. 🐶✨</h2>
          <br />
        </div>
      </div>
    </>
  );
}

export default Banner;
