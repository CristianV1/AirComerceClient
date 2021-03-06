import {
  chakra,
  Box,
  Image,
  Flex,
  Icon,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdHeadset, MdTimer, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill, BsCurrencyDollar } from "react-icons/bs";
import {
  GiCommercialAirplane,
  GiAirplaneDeparture,
  GiAirplaneArrival,
} from "react-icons/gi";
import { Link } from "react-router-dom";
import { FavouriteButton } from "./FavouriteButton";

function capitalizeFirstLetter(string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

function Card({
  id,
  origin,
  destination,
  price,
  image,
  departureTime,
  airline,
}) {
  return (
    <div>
      <Flex
        bg={useColorModeValue("#FFFF", "gray.900")}
        p={5}
        w="full"
        alignItems="center"
        justifyContent="start"
      >
        <Box
          w="sm"
          mx="auto"
          bg={useColorModeValue("white", "gray.800")}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: useColorModeValue("teal.50", "gray.700"),
            transform: "translateY(2px)",
            boxShadow: "lg",
          }}
          _focus={{
            bg: "teal.50",
          }}
        >
          <Link to={`/detailspage${id}`}>
            <Box
              _hover={{
                filter: "auto",
                blur: "2px",
              }}
            >
              <Image
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    "https://www.wallpapertip.com/wmimgs/15-157095_1080p-aeroplane-images-hd.jpg";
                }}
                w="full"
                h={56}
                fit="cover"
                objectPosition="center"
                src={image}
                alt="avatar"
              />
            </Box>
          </Link>
          <FavouriteButton
            id={id}
            origin={origin}
            destination={destination}
            price={price}
            image={image}
            departureTime={departureTime}
            airline={airline}
            position="absolute"
            top="4"
            right="4"
          />

          <Flex alignItems="center" px={6} py={3} bg="gray.900">
            <Icon as={GiCommercialAirplane} h={6} w={6} color="white" />

            <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
              {capitalizeFirstLetter(airline) || "Not Airline"}
            </chakra.h1>
          </Flex>

          <Box py={4} px={6}>
            <chakra.h1
              fontSize="xl"
              fontWeight="bold"
              color={useColorModeValue("gray.800", "white")}
            >
              {}
            </chakra.h1>

            {/* <chakra.p py={2} color={useColorModeValue("gray.700", "gray.400")}>
            Full Stack maker & UI / UX Designer , love hip hop music Author of
            Building UI.
          </chakra.p> */}

            <Flex
              alignItems="center"
              mt={4}
              color={useColorModeValue("gray.700", "gray.200")}
            >
              <Icon as={GiAirplaneDeparture} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {origin}
              </chakra.h1>
              <Spacer></Spacer>

              <Icon as={MdTimer} h={6} w={6} mr={2} />
              <chakra.h1 px={2} fontSize="sm">
                {departureTime}
              </chakra.h1>
            </Flex>
            <Spacer />
            <Spacer></Spacer>
            <Flex
              alignItems="center"
              mt={4}
              color={useColorModeValue("gray.700", "gray.200")}
            >
              <Icon as={GiAirplaneArrival} h={6} w={6} mr={2} />

              <chakra.h1 px={2} fontSize="sm">
                {destination}
              </chakra.h1>
              <Spacer></Spacer>
              <Icon as={BsCurrencyDollar} h={6} w={6} mr={2} />
              <chakra.h1 px={2} fontSize="sm">
                {price}
              </chakra.h1>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Card;
