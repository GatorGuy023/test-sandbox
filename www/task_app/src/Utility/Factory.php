<?php
namespace App\Utility;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class Factory {
    /**
     * @return Serializer
     */
    public static function serializerFactory(): Serializer {
        return new Serializer(self::normalizerFactory(), self::encodersFactory());
    }

    /**
     * @return [JsonEncoder]
     */
    public static function encodersFactory(): Array {
        return [new JsonEncoder()];
    }

    /**
     * @return [ObjectNormalizer]
     */
    public static function normalizerFactory(): Array {
        return [new ObjectNormalizer];
    }
}