import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  useToast,
  List,
  ListItem,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addToCart,
  getOfferDetails,
  resetStates,
} from "../../../../redux/actions/actions";


import LoadingPage from "../../Features/Loading/LoadingPage";
import WithSubnavigation from "../../Features/NavBar";

export default function Details({user}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { id } = useParams();
  const addCart = useSelector((state) => state.cart);
  let cityDetails = useSelector((state) => state.city_details);
  let cityDetailsUsage = cityDetails[0];
  console.log(id);

  useEffect(() => {
    dispatch(getOfferDetails(id));
    return () => dispatch(resetStates());
  }, [id, dispatch]);

  console.log("Details 1", cityDetails);
  console.log("Details 2", cityDetailsUsage);
  return (
    <div>
      {Object.keys(cityDetails).length > 0 ? (
        <div>
          <WithSubnavigation user={user} />
          <Container maxW={"7xl"}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 5, md: 10 }}
              py={{ base: 10, md: 15 }}
            >
              <Flex>
                <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={cityDetailsUsage["arrival"]["image"]}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  h={{ base: "100%", sm: "400px", lg: "500px" }}
                />
              </Flex>
              <Stack spacing={{ base: 1, md: 4 }}>
                <Box>
                  <Heading
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  >
                    {cityDetailsUsage["arrival"]["nameCity"]},{" "}
                    {cityDetailsUsage["arrival"]["nameCountry"]}
                  </Heading>
                  <Text
                    fontWeight={300}
                    fontSize={"2xl"}
                  >
                    {`${cityDetailsUsage["price"]} EUR`}
                  </Text>
                  <Text
                   
                    fontWeight={300}
                    fontSize={"2xl"}
                  >
                    {cityDetailsUsage["airline"]["name"] &&
                      "Airline: " + cityDetailsUsage["airline"]["name"]}
                  </Text>
                </Box>
                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={"column"}
                  divider={
                    <StackDivider
                      borderColor={
                        /*useColorModeValue("gray.200", "gray.600")*/ "gray.200"
                      }
                    />
                  }
                >
                  <Box
                  textAlign={"left"}>
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={
                        /*useColorModeValue("teal.500", "teal.300")*/ "teal.500"
                      }
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Details
                    </Text>

                    <List spacing={6}>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Date:
                        </Text>{" "}
                        {cityDetailsUsage["date"]}
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Arrival airport:
                        </Text>{" "}
                        {cityDetailsUsage["arrival"]["nameAirport"]}
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Scheduled arrival time
                        </Text>{" "}
                        {cityDetailsUsage["arrival"]["scheduledTime"] + " hs"}
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Departure:
                        </Text>{" "}
                        {cityDetailsUsage["departure"]["nameCity"]},{" "}
                        {cityDetailsUsage["departure"]["nameCountry"]}
                      </ListItem>

                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Departure airport:
                        </Text>{" "}
                        {cityDetailsUsage["departure"]["nameAirport"]}
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Scheduled departure time:
                        </Text>{" "}
                        {cityDetailsUsage["departure"]["scheduledTime"] + " hs"}
                      </ListItem>
                    </List>
                  </Box>
                </Stack>

                <Button
                  rounded={"none"}
                  w={"full"}
                  mt={8}
                  size={"lg"}
                  py={"7"}
                  bg={/*useColorModeValue("gray.900", "gray.50")*/ "gray.900"}
                  color={/*useColorModeValue("white", "gray.900")*/ "white"}
                  textTransform={"uppercase"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                  onClick={() => {
                    addCart.find((item) => item._id === id)
                      ? toast({
                          description: "Already added to cart",
                          status: "error",
                          duration: 9000,
                          isClosable: true,
                        })
                      : dispatch(addToCart(id));
                  }}
                >
                  Add to cart
                </Button>
              </Stack>
            </SimpleGrid>
          </Container>
        </div>
      ) : (
        <LoadingPage></LoadingPage>
      )}
    </div>
  );
}
