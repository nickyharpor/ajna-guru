package network.akash.akashnotifier.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeploymentsPage {
	private Collection<Deployment> data;
	private int offset, limit, total;
}
