package network.akash.akashnotifier.mapper.generic;

import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.List;

public abstract class GenericEntityToDataTransferObjectMapper<E, D> {
    public abstract D toDTO(E entity);

    public abstract List<D> toDTO(Iterable<E> iterable);

    public Page<D> toDTO(Page<E> page) {
        return new PageImpl<>(toDTO(page.getContent())
                , page.getPageable(), page.getTotalElements());
    }

    public abstract E toEntity(D dto);

    public abstract List<E> toEntity(Iterable<D> e);

    public abstract void update(@MappingTarget E entity, D dto);

    @BeanMapping(nullValuePropertyMappingStrategy =
            NullValuePropertyMappingStrategy.IGNORE,
            nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
    public abstract void patch(@MappingTarget E entity, D dto);
}
