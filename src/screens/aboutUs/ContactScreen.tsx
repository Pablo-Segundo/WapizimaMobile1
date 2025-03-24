import { Box, Button, Center, FormControl, HStack, Heading, Input, ScrollView, Text, TextArea, useToast } from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../../api/Wapizima';
import { useForm } from '../../hooks/useForm';

export const ContactScreen = () => {
    const toast = useToast();
    const { name, email, phone, commt, onChange, clear } = useForm({
        name: '',
        email: '',
        phone: '',
        commt: ''
    });

    const startSendMessage = async () => {
        try {
            const { data } = await API.post('/contact', { name, email, phone, commt });
            clear();
            toast.show({
                duration: 3000,
                render: () => (
                    <Box bg="emerald.500" px="4" py="2" rounded="md" shadow={2}>
                        <Text color="white" fontSize="md" bold>{data.message}</Text>
                    </Box>
                ),
            });
        } catch (error) {
            toast.show({
                duration: 3000,
                render: () => (
                    <Box bg="red.500" px="4" py="2" rounded="md" shadow={2}>
                        <Text color="white" fontSize="md" bold>{error.response?.data?.message || 'Error al enviar'}</Text>
                    </Box>
                ),
            });
        }
    };

    return (
        <ScrollView bg="white">
            <Box p={4} alignItems="center">
                <Heading mt={2} textAlign="center">Envíanos un mensaje</Heading>
                <FormControl mt={4} w="100%">
                    {['Nombre', 'Correo', 'Número telefónico'].map((label, index) => (
                        <Box key={index} mb={3}>
                            <FormControl.Label>{label}:</FormControl.Label>
                            <Input
                                placeholder={`Ingresar ${label.toLowerCase()}`}
                                onChangeText={(value) => onChange(value, label.toLowerCase())}
                                value={eval(label.toLowerCase())}
                                autoCapitalize={label === 'Correo' ? 'none' : 'words'}
                                keyboardType={label === 'Número telefónico' ? 'number-pad' : 'default'}
                            />
                        </Box>
                    ))}
                    <FormControl.Label>Comentarios:</FormControl.Label>
                    <TextArea
                        placeholder="¿Cómo podemos ayudarte?"
                        onChangeText={(value) => onChange(value, 'commt')}
                        value={commt}
                        autoCompleteType={undefined}
                    />
                </FormControl>
                <Button mt={6} w="50%" bg="omega.50" borderRadius={15} onPress={startSendMessage}>
                    <Text color="white" fontSize="lg" bold>Enviar</Text>
                </Button>
            </Box>
            {[
                { icon: 'pin', title: 'Dirección', text: 'Dr. Andrés Benavides 304, Residencial Colón y Col Ciprés, 50120 Toluca de Lerdo, Méx.' },
                { icon: 'call', title: 'Hablemos', text: '+52 (722 781 5291)\n+52 (729 143 9285)' },
                { icon: 'mail-open', title: 'Soporte de Venta', text: 'info@wapizima.com.mx' }
            ].map((item, index) => (
                <HStack key={index} my={2} space={3} justifyContent="center" alignItems="center">
                    <Center p={2} w="20%">
                        <Ionicons name={item.icon} size={50} color="black" />
                    </Center>
                    <Box w="70%">
                        <Text bold>{item.title}</Text>
                        <Text>{item.text}</Text>
                    </Box>
                </HStack>
            ))}
        </ScrollView>
    );
};
