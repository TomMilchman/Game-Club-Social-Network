import MortalKombat1KeyArt from "../images/upcoming-releases/Mortal_Kombat_1_key_art.jpeg";
import SuperMarioBrosWonderKeyArt from "../images/upcoming-releases/Mario_Wonder_key_art.jpg";

export default function UpcomingReleasesPage() {
  return (
    <>
      <h1>Upcoming Releases:</h1>
      <h2>Mortal Kombat 1</h2>
      <h3>
        This new and exciting release in the beloved fighting game franchise
        serves as both a sequel and a reboot of the timeline. After the events
        of Mortal Kombat 11, Liu Kang became the Fire God and reset the
        timeline. This new timeline will be a fresh start for the series, and
        will allow for new and exciting stories to be told. Watch as your
        favorite characters are reimagined when the game releases on 19
        September 2023.
      </h3>
      <img src={MortalKombat1KeyArt} />
      <br />
      <h2>Super Mario Bros. Wonder</h2>
      <h3>
        This new and quirky fresh take on the 2D plaforming series of the Mario
        franchise will be sure to delight fans of the series. Featuring Mario,
        Luigi, Toad, Princess Peach and Yoshi, as well as all sorts of weird and
        exciting powerups, such as... Elephant Mario...? Hop in your warp pipe
        and get ready to play when the game releases on 20 October 2023.
      </h3>
      <img src={SuperMarioBrosWonderKeyArt} />
    </>
  );
}
