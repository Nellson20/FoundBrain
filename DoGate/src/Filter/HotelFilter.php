<?php

namespace App\Filter;

use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;

class HotelFilter extends AbstractFilter
{
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?Operation $operationName = null,array $context = []): void
    {
        if ($property === 'localisation' && $value !== null) {
            $queryBuilder->leftJoin('o.city', 'c');
            $queryBuilder->leftJoin('c.country', 'co');
            $queryBuilder->andWhere('c.name = :cityName OR co.name = :countryName');
            $queryBuilder->setParameter('cityName', $value);
            $queryBuilder->setParameter('countryName', $value);
            $queryBuilder->orderBy('o.rating', 'DESC');
        }
        if ($property === 'name')
            $queryBuilder->orderBy('o.name', 'ASC');
    }

    public function getDescription(string $resourceClass): array
    {
        return [
            'localisation' => [
               'property' => null,
               'type' => 'string',
               'required' => false,
            ],
            'name' => [
                'property' => null,
                'type' => 'string',
                'required' => false,
             ],
        ];
    }
}
