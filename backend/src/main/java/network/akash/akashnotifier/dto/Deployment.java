package network.akash.akashnotifier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Deployment {
    private String dseq, settledAt, providerName;
    private Scalar balance, transferred, price;
    private Resource resources;
    private Remaining remaining;
}
