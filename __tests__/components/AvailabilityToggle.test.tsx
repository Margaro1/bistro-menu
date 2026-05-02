import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AvailabilityToggle } from '@/components/admin/AvailabilityToggle'

describe('AvailabilityToggle', () => {
  it('tiene aria-checked=true cuando available=true', () => {
    render(<AvailabilityToggle productId={1} available={true} onToggle={() => {}} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('tiene aria-checked=false cuando available=false', () => {
    render(<AvailabilityToggle productId={1} available={false} onToggle={() => {}} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
  })

  it('llama a onToggle con id y valor invertido al hacer clic', async () => {
    const onToggle = jest.fn()
    render(<AvailabilityToggle productId={5} available={true} onToggle={onToggle} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onToggle).toHaveBeenCalledWith(5, false)
  })
})
