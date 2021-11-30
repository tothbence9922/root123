package hu.caff.backend.repository;

import hu.caff.backend.domain.Caff;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CaffRepository extends CrudRepository<Caff, Long> {
}
