<?php

namespace App\Filter;

use App\Entity\Company;
use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;

class OrSearchFilter extends AbstractFilter
{

    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?Operation $operationName = null, array $context = []): void
{
    if ($property !== 'or' || !is_array($value)) {
        return;
    }

    $alias = $queryBuilder->getRootAliases()[0];
    $orX = $queryBuilder->expr()->orX();

    $nb = 0; // Déclaration de la variable $nb

    foreach ($value as $key => $val) {
        $nb++; // Incrémentation de $nb à chaque itération

        // Check if the property is nested
        $nestedProperties = explode('.', $key);
        if (count($nestedProperties) > 1) {
            list($rel,$field)=$nestedProperties;
            $joinAlias = 'r' . $nb;
            // Join the necessary tables for nested properties
            $queryBuilder->innerJoin("$alias.$rel", $joinAlias);
            $orX->add($queryBuilder->expr()->eq("$joinAlias.$field", ":".$field."_$nb"));
            $queryBuilder->setParameter($field."_$nb", $val);
        } else {
            $orX->add($queryBuilder->expr()->like("$alias.$key", ":param_$key"));
            $queryBuilder->setParameter("param_$key", '%' . $val . '%');
        }
    }

    $queryBuilder->andWhere($orX);
}




    public function getDescription(string $resourceClass): array
    {
        return [
            'or' => [
                'property' => null,
                'type' => 'string',
                'required' => false,
            ]
        ];
    }

}
