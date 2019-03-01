/*
 * Copyright (C) 2019 Arthur Gregorio, AG.Software
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package br.com.webbudget.application.validator.apportionment;

import br.com.webbudget.domain.entities.financial.Apportionment;
import br.com.webbudget.domain.entities.financial.Movement;
import br.com.webbudget.domain.exceptions.BusinessLogicException;

import javax.enterprise.context.Dependent;
import java.math.BigDecimal;

import static br.com.webbudget.infrastructure.utils.Utilities.decimalToString;

/**
 * Validate the {@link Apportionment} value
 *
 * @author Arthur Gregorio
 *
 * @version 1.0.0
 * @since 3.0.0, 06/01/2019
 */
@Dependent
public class ValueValidator implements ApportionmentValidator {

    /**
     * {@inheritDoc}
     *
     * @param apportionment
     * @param movement
     */
    @Override
    public void validate(Apportionment apportionment, Movement movement) {

        if (apportionment.getValue().equals(BigDecimal.ZERO)) {
            throw new BusinessLogicException("error.movement.value-equal-zero");
        }

        final BigDecimal remainingTotal = movement.calculateRemainingTotal();

        if (apportionment.getValue().compareTo(remainingTotal) > 0) {
            throw new BusinessLogicException("error.movement.value-gt-total", decimalToString(remainingTotal));
        }
    }
}
