import { Header } from "./components/Header";

Header();

// dynamic import
import("Number1/Header").then((module) => {
  const number1Header = module.Header;
  number1Header();
});
