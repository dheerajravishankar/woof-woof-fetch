import DogsCount from "../components/DogsCount";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import styles from "./HomeLayout.module.css";
import { useDogs } from "../context/DogsContext";
import Banner from "../components/Banner";

function HomeLayout({ handleNavigate, children, handleSort, sortOrder }) {
  const { totalDogs } = useDogs();
  return (
    <div className={styles.allDogs}>
      <Header />
      <Banner />
      <div className={styles.dogsCount}>
        <DogsCount count={totalDogs} />
      </div>
      <SideBar handleSort={handleSort} sortOrder={sortOrder} />
      <div className={styles.main}>{children}</div>
      <Footer handleNavigate={handleNavigate} />
    </div>
  );
}

export default HomeLayout;
