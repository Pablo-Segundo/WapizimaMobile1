import { Box, Center, HStack, ScrollView, Text, VStack } from 'native-base';
import React, { useContext, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Loading } from '../../components/Loading';
import { OfferContext } from '../../context/Offer/OfferContext';

export const DistributorScreen = () => {
    const { getBusinessRules, businessRule } = useContext(OfferContext);

    useEffect(() => {
        getBusinessRules();
    }, []);

    if (!businessRule) {
        return <Loading />;
    }

    return (
        <ScrollView bg={'gray.100'}>
            <Center>
                <Box mt={6} shadow={5} bg={'white'} borderRadius={'lg'} p={6} width={'90%'} alignItems={'center'}>
                    <Ionicons name="card" size={100} color={'black'} />
                    <Text color={'black'} fontSize={'2xl'} bold>
                        Conviértete en distribuidor
                    </Text>
                    <Text color={'gray.600'} fontSize={'md'} textAlign={'center'}>
                        Únete a nuestra red de distribuidores y aprovecha los grandes beneficios que Wapizima tiene para ti.
                    </Text>
                </Box>
                <Box shadow={5} borderRadius={'lg'} p={4} mt={6} bg={'white'} width={'95%'}>
                    <Text color={'black'} fontSize={'xl'} bold textAlign={'center'} mb={4}>
                        Descuentos para Distribuidores
                    </Text>
                    <VStack space={3} alignItems="center">
                        <HStack bg={'primary.500'} py={2} borderRadius={5} width={'100%'}>
                            <Center w="33%">
                                <Text color={'white'} bold textAlign={'center'}>AL COMPRAR</Text>
                            </Center>
                            <Center w="33%">
                                <Text color={'white'} bold textAlign={'center'}>HASTA</Text>
                            </Center>
                            <Center w="33%">
                                <Text color={'white'} bold textAlign={'center'}>DESCUENTO</Text>
                            </Center>
                        </HStack>
                        {businessRule.map((rule, index) => (
                            <HStack key={index} borderBottomWidth={1} py={2} borderColor={'gray.300'} width={'100%'}>
                                <Center w="33%">
                                    <Text color={'black'} bold textAlign={'center'}>
                                        ${rule.minimum_money} MXN
                                    </Text>
                                </Center>
                                <Center w="33%">
                                    <Text color={'black'} bold textAlign={'center'}>
                                        ${rule.maximum_money} MXN
                                    </Text>
                                </Center>
                                <Center w="33%">
                                    <Text color={'green.500'} bold textAlign={'center'}>
                                        {rule.discount}%
                                    </Text>
                                </Center>
                            </HStack>
                        ))}
                    </VStack>
                </Box>
                {[
                    { icon: 'person-add', title: 'REGÍSTRATE', description: 'Dirígete al apartado REGÍSTRATE e ingresa tus datos para crear tu perfil.' },
                    { icon: 'reader', title: 'ACCEDE A SER DISTRIBUIDOR', description: 'Consulta los descuentos disponibles en la tabla de arriba.' },
                    { icon: 'book', title: 'REVISA NUESTRO CATÁLOGO', description: 'Ve a la sección de PRODUCTOS para explorar nuestro catálogo completo.' },
                    { icon: 'cart', title: 'COMIENZA A COMPRAR', description: 'Agrega productos de tu interés a tu carrito después de revisar el catálogo.' },
                    { icon: 'checkmark-done-circle', title: 'VERIFICA TUS PEDIDOS', description: 'En tu carrito, revisa los productos y sus cantidades antes de proceder.' },
                    { icon: 'card', title: 'PROCEDER A PAGAR', description: 'Elige entre transferencia o pago con tarjeta y revisa tu orden antes de pagar.' },
                ].map((step, index) => (
                    <HStack key={index} my={4} space={4} alignItems="center" width={'90%'}>
                        <Center p={3} shadow={3} bg={'white'} borderRadius={'full'}>
                            <Ionicons name={step.icon} size={80} color={'black'} />
                        </Center>
                        <Box flex={1}>
                            <Text bold color={'black'} fontSize={'lg'}>
                                {step.title}
                            </Text>
                            <Text color={'gray.600'} textAlign={'justify'}>
                                {step.description}
                            </Text>
                        </Box>
                    </HStack>
                ))}
            </Center>
        </ScrollView>
    );
};
