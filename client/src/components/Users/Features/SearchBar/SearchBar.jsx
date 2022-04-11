import {
  Box,
  Input,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon, CalendarIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getFlights, isOnSearch } from "../../../../redux/actions/actions";
import { FaCity } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/react";

function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const [input, setInput] = useState({ airline: "", date: "" });
  const [tempInput, setTempInput] = useState({ tempAirline: "", tempDate: "" });
  const [isFocus, setIsFocus] = useState(false);

  function getAfterDate() {
    const sumarDias = (fecha, dias) => {
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    };

    var f = new Date();

    // console.log(f);

    const semanaDespues = sumarDias(f, 9);

    // console.log(semanaDespues);
    const fechaFinal =
      semanaDespues.getFullYear() +
      "-" +
      ("0" + (semanaDespues.getMonth() + 1)).slice(-2) +
      "-" +
      semanaDespues.getDate();

    return fechaFinal;
  }
  function handlerOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }

  function clearInputs() {
    setInput({ ...input, airline: "", date: "" });
  }

  function handler(e) {
    var arr = e.target.value.split(",");
    var relation = search.filter(
      (city) =>
        city.nameCity.toLowerCase().includes(arr[0].toLowerCase()) &&
        city.nameCountry
          ?.toLowerCase()
          .includes(arr[1]?.replace(" ", "").toLowerCase())
    );
    // console.log("CONSOLE",relation[0]["airports"][0]["codeIataAirport"])
    if (relation.length > 0) {
      setInput({
        ...input,
        airline:
          relation &&
          relation[0]["airports"][relation[0]["airports"].length - 1][
            "codeIataAirport"
          ],
      });
    }
  }

  return (
    <Box>
      <Flex>
        <InputGroup width={200}>
          <InputLeftElement
            children={<Search2Icon opacity="60%" />}
            color={useColorModeValue("grey.200", "Black")}
          />
          <Input
            marginRight="2px"
            width={"100%"}
            bg="white"
            type="text"
            _placeholder={{
              color: useColorModeValue("grey.200", "Black"),
            }}
            color="black"
            name="airline"
            variant="flushed"
            placeholder="Search a origin..."
            list="cities"
            onChange={(e) => {
              //setTempInput({...tempInput,tempAirline:e.target.value})
              handler(e);
            }}
          />
          <datalist id="cities">
            {search.map((e) => (
              <option key={e._id}>
                {e.nameCity}, {e.nameCountry}
              </option>
            ))}
          </datalist>
        </InputGroup>

        <Input
          _placeholder={{
            color: useColorModeValue("grey.200", "Black"),
          }}
          textAlign="center"
          color="black"
          width={200}
          bg="white"
          name="date"
          variant="flushed"
          placeholder="Departure Date"
          type={isFocus ? "date" : "text"}
          onFocus={(e) => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          min={getAfterDate()}
          onChange={
            //setTempInput({...tempInput,tempAirline:e.target.value})
            handlerOnChange
          }
        />
        <Button
          colorScheme="blue"
          _hover={{ bg: "blue.800", color: "white" }}
          variant="outline"
          onClick={() => {
            dispatch(isOnSearch(true));
            dispatch(getFlights(input));
            clearInputs();
          }}
        >
          {/* <Search2Icon /> */}
          Search!
        </Button>
      </Flex>
    </Box>
  );
}

export default SearchBar;