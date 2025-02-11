import CustomContainer from "./CustomContainer";
import { Button, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useWeb3Transfer } from "react-moralis";
import Moralis from "moralis";

export default function SendCrypto() {

    const [amount, setAmount] = useState(0)

    const handleChange = (value) => setAmount(value)

    const toast = useToast()

    const {fetch, isFetching} = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount),
        receiver: receiver,
        type: 'native'
    })

    const [receiver, setReceiver] = useState('')
    return(
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Send Crypto</Text>
            <form onSubmit={async e => {
                e.preventDefault()
                await Moralis.enableWeb3()
                fetch({
                    onSuccess: () => {
                        toast({
                            title: 'ETH Successfully sent',
                            description: 'Fresh ETH are showing up into the receiver wallet',
                            duration: 9000,
                            isClosable: true
                        })
                        setReceiver('')
                    },
                    onError: () => {
                        toast({
                            title: 'Error',
                            description: error,
                            status: 'error',
                            duration: 9000,
                            isClosable: true
                        })
                    }
                })
            }}>
                <FormControl mt="4">
                    <FormLabel htmlFor="amount">
                        Amount of ETH
                    </FormLabel>
                    <NumberInput step={0.01} onChange={handleChange}>
                        <NumberInputField id="amount" value={amount}/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <FormLabel mt="4" htmlFor="receiver">Send to</FormLabel>
                    <Input id="receiver" type="text" placeholder="Receiver Address" value={receiver} onChange={e => setReceiver(e.target.value)}/>
                </FormControl>
                <Button mt="4" type="submit" colorScheme="purple" disabled={isFetching}>💸&nbsp; Send</Button>
            </form>
        </CustomContainer>
    )
}